# TrustFlow

Desk Pitch: https://www.figma.com/proto/a7ksdWdaUDVmX1ahLIyuNv/ETHLISBON-2025?node-id=2013-315&t=eJjnLXLmsVFrGq5b-1&scaling=min-zoom&content-scaling=fixed&page-id=8%3A2&starting-point-node-id=2013%3A315
## 🔷 What is TrustFlow?

**TrustFlow** is a decentralized public funding infrastructure powered by a **DAO deployed on Kusama**. It enables individuals, organizations, and communities to **propose, vote on, and fund verified social impact initiatives** in a transparent, participatory, and permissionless way.

In this MVP version (**testnet**), users can donate any amount using a **simulated stablecoin (TFL)**. Upon donation, they automatically receive **TF**, a **non-transferable governance token** (1 TF = 1 vote), which grants the right to:

- 📝 Create verified funding proposals  
- 🗳️ Vote on initiatives they want to support


![Landing](https://github.com/Molina-Daniel/TrustFlow/blob/main/frontend/Landing.jpeg)



## 🧠 How It Works

### ✅ Direct Donation  
Users donate using the simulated stablecoin TFL.  
There’s no need to purchase anything. For every 1 TFL donated, the user receives 1 TF token.

### ✅ Open Governance  
Anyone holding TF can participate in DAO decision-making:
1. Fill out the proposal submission form  
2. Verify their identity using an **AI Agent powered by the Olas SDK**

### ✅ Decentralized Validation  
Proposals are submitted directly to the DAO.  
They are approved if they receive at least **10% of the total TF votes in circulation**.  
All governance is handled through smart contracts deployed on **Kusama**.



## 🚀 Getting Started

TrustFlow is composed of several modular smart contracts:

| Component             | Function                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| `GovToken.sol`        | Non-transferable governance token (TF)                                   |
| `FundingManager.sol`  | Accepts donations and mints TF to users                                  |
| `TrustFlow.sol`       | Coordinates proposal creation and voting logic                           |
| `StableErc20.sol`     | Simulated stablecoin (TFL) for testnet usage                             |
| `ImpactAgent` (future) | AI agent powered by Olas SDK for identity verification and automation    |

---


### ⚙️ Quick Setup

```bash
# Clone the repo:
git clone https://github.com/Molina-Daniel/TrustFlow
cd TrustFlow

# Frontend:
cd frontend
npm install
npm run dev
```

### 🧠 Manual Setup (for modular usage)

You can use each component separately depending on your needs:

## 🔍 Features

- 🌐 **On-Chain Traceability**: All donations are transparently recorded on Kusama.

## 📁 Project Structure

```
/contracts            # Smart contracts (Kusama testnet)
  GovToken.sol
  FundingManager.sol
  TrustFlow.sol
  StableErc20.sol

/scripts              # Deployment scripts
/frontend             # React-based user dashboard
/docs                 # Architecture, diagrams, specs

```

## 🔍 Key Features
🌐 Full on-chain traceability of all donations on Kusama

🗳️ Open DAO governance via smart contracts (no Snapshot)

🧠 Identity verification with AI Agents (Olas SDK)

⚡ Simple participation: just donate to start voting or proposing

## 🔒 Security Notes
- Always deploy to testnet before mainnet

- Validate logic of AI agents before registration

- Secure any webhook integrations in future modules

## 📌 Next Steps
- Register TrustFlow DAO on Kusama

- Launch AI agent for identity verification

- Expand proposal taxonomy for more impact categories

## 🔮 Coming Soon...
TrustFlow will integrate an AI-powered swap agent that:

- Detects crypto assets like ETH, BTC, or MATIC

- Fetches real-time prices

- Converts any token into a selected stablecoin during donation

This will enable seamless donations from any chain or currency, lowering friction for contributors around the world.

## 💡 Why TrustFlow?
Because social impact deserves transparency, automation, and community-driven governance.

