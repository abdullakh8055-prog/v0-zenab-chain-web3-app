🌱 ZENAB Chain


Decentralized Environmental Sustainability Verification System


📌 Project Overview

ZENAB Chain is a decentralized environmental sustainability verification platform built on Algorand using AlgoKit and PyTEAL.

The system addresses the global issue of greenwashing, where organizations claim carbon reduction and ESG improvements through centralized reports that lack transparency and verifiable proof.

ZENAB converts environmental performance into a measurable Environmental Impact Score (EIS) and validates it through a smart contract deployed on Algorand Testnet, ensuring tamper-proof and publicly auditable sustainability verification.



❗ Problem Statement


Traditional carbon credit and ESG systems suffer from:

Centralized data storage

Delayed verification

Manual audit dependency

Data manipulation risk

Double counting of carbon credits

Greenwashing practices

There is no decentralized, real-time, immutable verification layer to validate environmental improvement claims.



💡 Proposed Solution

ZENAB Chain introduces:

Environmental Impact Score (EIS) computation

Smart contract-based sustainability validation

Blockchain-backed immutable verification

Transparent and traceable carbon credit logic

The system ensures environmental claims are verified algorithmically before being permanently recorded on-chain.



🏗️ System Architecture


Frontend (React – Hosted on Vercel)
            ↓
Vercel Serverless API (Node.js + algosdk)
            ↓
Algorand Smart Contract (PyTEAL – Deployed using AlgoKit)
            ↓
Algorand Testnet (Publicly Verifiable via AlgoExplorer)

Run Smart Contract:
  smart-contract/zenab/projects/zenab/

Run Frontend:
  frontend/

Vercel API:
  api/verify.js  (or frontend/api/verify.js depending on setup)





⚙️ Smart Contract Logic


The PyTEAL smart contract performs deterministic validation.

Method: submit_eis(eis)

If eis >= 70:

Store EIS in global state

Store timestamp

Store sender address

Mark verification as successful

If eis < 70:

Reject transaction

This ensures only verified environmental improvements are recorded on-chain.

🔗 Role of Algorand

Algorand provides:

Smart contract deployment via AlgoKit

Immutable storage of verified EIS

Fast transaction finality (~4 seconds)

Low transaction cost

Public auditability via AlgoExplorer

Carbon credit tokenization (ASA model concept)



💰 Trading Strategy



ZENAB enables a verified carbon credit trading mechanism:

Environmental improvements are validated via smart contract

Verified units can be minted as Algorand Standard Assets (ASA)

Each token represents one verified pollution reduction unit

Pricing formula:

Credit Price = Base Rate × (EIS / 100)


Blockchain ensures:

No double counting

No manipulation

Transparent ownership tracking

This creates a decentralized, tamper-proof carbon marketplace.

🛠️ Technology Stack

Component	Technology
Smart Contract	PyTEAL
Framework	AlgoKit
Blockchain	Algorand Testnet
Backend	Node.js + algosdk
Frontend	React
Hosting	Vercel
Token Model	Algorand Standard Asset (ASA)


🚀 Deployment Details

🔹 Smart Contract Deployment

Deployed using AlgoKit to Algorand Testnet.

App ID (Testnet):
755800526

Explorer Link:
https://testnet.algoexplorer.io/application/755800526

Deployer Address:
6BHJ7W4MOJWPBJ7G2TJMRRXKZP4PSEGXDV7MM2PD2MTU65IMQIL4EKG4DE

🔹 Live Demo

Frontend Hosted on Vercel:

https://v0-zenab-chain-web3-app.vercel.app


📂 Installation & Setup

1️⃣ Clone Repository
git clone https://github.com/yourusername/zenab-chain.git
cd zenab-chain

2️⃣ Deploy Smart Contract
algokit project deploy testnet




📊 Usage Guide

Enter pollution parameters (CO2, PM2.5, PM10)

Click Verify on Algorand

System computes Environmental Impact Score

Smart contract validates threshold

Transaction proof appears with AlgoExplorer link

⚠ Known Limitations

Deployed on Testnet (not Mainnet)

Simulated environmental data

Basic EIS calculation model

Requires funded Testnet account

IoT integration conceptual (prototype stage)

🎯 Expected Impact

ZENAB Chain eliminates greenwashing by:

Replacing trust-based ESG reporting with smart contract enforcement

Providing real-time blockchain verification

Enabling transparent carbon credit trading

Ensuring immutable audit trails
