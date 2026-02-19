import { NextRequest, NextResponse } from 'next/server';
import { calculateEIS } from '@/lib/validation';
import algosdk from 'algosdk';

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
    const eis = calculateEIS(co2, pm25, pm10);

    // Check if EIS meets verification threshold
    if (eis < 70) {
      return NextResponse.json(
        {
          eis: Math.round(eis * 100) / 100,
          status: 'Below threshold',
        },
        { status: 200 }
      );
    }

    // For EIS >= 70, proceed with Algorand verification
    try {
      // Initialize Algorand client with testnet
      const algodToken = '';
      const algodServer = 'https://testnet-api.algonode.cloud';
      const algodPort = 443;
      const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

      // Get the app ID from environment variable (placeholder for now)
      const appId = parseInt(process.env.NEXT_PUBLIC_ALGORAND_APP_ID || '0');
      
      if (appId === 0) {
        return NextResponse.json(
          {
            eis: Math.round(eis * 100) / 100,
            txId: 'PLACEHOLDER_TX_ID_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            explorerTx: `https://testnet.explorer.algorand.state.al/tx/PLACEHOLDER_TX_ID`,
            explorerApp: `https://testnet.explorer.algorand.state.al/application/${appId}`,
          },
          { status: 200 }
        );
      }

      // In a real implementation, you would:
      // 1. Create an AtomicTransactionComposer
      // 2. Add an application call transaction
      // 3. Sign and submit the transaction
      // 4. Return the transaction ID

      // For now, return a simulated successful response
      const txId = 'MOCK_TX_' + Math.random().toString(36).substr(2, 16).toUpperCase();

      return NextResponse.json(
        {
          eis: Math.round(eis * 100) / 100,
          txId: txId,
          explorerTx: `https://testnet.explorer.algorand.state.al/tx/${txId}`,
          explorerApp: `https://testnet.explorer.algorand.state.al/application/${appId}`,
        },
        { status: 200 }
      );
    } catch (algoError) {
      console.error('Algorand error:', algoError);
      // Return EIS with error info
      return NextResponse.json(
        {
          eis: Math.round(eis * 100) / 100,
          error: 'Failed to verify on Algorand blockchain',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
