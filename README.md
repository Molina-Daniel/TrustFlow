# TrustFlow DAO

🌀 **TrustFlow** - Transparent, automated, and participatory funding for social good.

![Landing)]([https://github.com/user-attachments/assets/739dfccd-6639-43a9-9bce-5771e8402cc0](https://github.com/Molina-Daniel/TrustFlow/edit/main/Landing%20Page.png))

## 🧩 Overview

TrustFlow is a decentralized platform for transparent, automated, and participatory funding of social impact initiatives. Its mission is to simplify the process of donating, tracking impact, and making collective decisions on the use of funds through an intuitive experience and Web3 technology.

## What Makes It Different?

Unlike other ReFi projects, this platform relies on three innovative pillars:

- **Complete On-chain Traceability**: All donations are recorded on the blockchain (e.g., Kusama), ensuring transparency, verifiable history, and accountability.

- **Decentralized and Automated Governance**: Decisions on which initiatives to fund are made through community votes on Snapshot or directly on-chain, integrating customized governance smart contracts (GovernorDAO or Moloch V2).

- **AI-Powered Autonomous Agents (Olas)**: An intelligent agent analyzes donation history and impact data to automatically propose new initiatives for voting, reducing friction and improving process efficiency.

## 🚀 Getting Started

TrustFlow is composed of several modular components:

- **FundingManager** – Smart contract that registers donations and associates them with users.
- **GovernanceModule** – DAO contracts (GovernorDAO/Moloch V2) deployed on Kusama for funding proposals and voting.
- **ImpactAgent** – Autonomous Olas agent that analyzes on-chain donation data and automatically generates new proposals.
- **xDAI Logger** – Webhook that logs off-chain GnosisPay payments for xDAI donations.

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
/contracts            # Smart contracts (Kusama)
  FundingManager.sol
  GovernanceModule.sol
/scripts              # Deployment scripts
/agents               # Olas AI agents
/webhook              # GnosisPay xDAI logger
/frontend             # React-based dashboard (optional)
/docs                 # Architecture, diagrams, specs
```

## 🔒 Security Notes

Ensure to:

- Use testnet deployments before mainnet.
- Verify agent proposal logic.
- Secure webhook endpoints.

## 📌 Next Steps

Before going live:

- Register the project DAO on-chain

## 💡 Why TrustFlow?

Because social impact deserves transparency, automation, and community-driven governance.
