import { NextRequest, NextResponse } from 'next/server';
import { calculateEIS } from '@/lib/validation';
import { db } from '@/lib/db';
import algosdk from 'algosdk';

const EIS_THRESHOLD = 80; // Changed from 70 to 80

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { co2, pm25, pm10 } = body;

    // Validate inputs
    if (typeof co2 !== 'number' || typeof pm25 !== 'number' || typeof pm10 !== 'number') {
      return NextResponse.json(
        { error: 'Invalid input format' },
        { status: 400 }
      );
    }

    // Calculate EIS
    const eis = Math.round(calculateEIS(co2, pm25, pm10) * 100) / 100;

    // Check if EIS is below threshold (80)
    if (eis < EIS_THRESHOLD) {
      // Data Saved - store in database
      const submission = db.addSubmission(co2, pm25, pm10, eis, 'saved');
      
      return NextResponse.json(
        {
          eis,
          status: 'saved',
          message: 'Data Saved',
          submissionId: submission.id,
        },
        { status: 200 }
      );
    }

    // For EIS >= 80, display Denied but still store for stats
    // Store as 'denied' status
    db.addSubmission(co2, pm25, pm10, eis, 'denied');

    return NextResponse.json(
      {
        eis,
        status: 'denied',
        message: 'Denied',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// New endpoint to get statistics
export async function GET(request: NextRequest) {
  try {
    const stats = db.getStats();
    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
