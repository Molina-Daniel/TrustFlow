

from web3 import Web3
import json
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

# Use the INFURA URL from the environment
INFURA_URL = os.getenv('INFURA_URL')
CONTRACT_ADDRESS = '0xc0Da01A04c3F3e0Be433606045bb7017A7323E38'
ABI_PATH = 'abis/GovernorAlpha_abi.json'

# === SETUP ===
w3 = Web3(Web3.HTTPProvider(INFURA_URL))
with open(ABI_PATH, "r") as f:
    abi = json.load(f)

contract = w3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS), abi=abi)

# === LOGIC ===
proposal_count = contract.functions.proposalCount().call()
prop = contract.functions.proposals(proposal_count).call()
actions = contract.functions.getActions(proposal_count).call()
state_code = contract.functions.state(proposal_count).call()
states = ["Pending", "Active", "Canceled", "Defeated", "Succeeded", "Queued", "Expired", "Executed"]
state = states[state_code]

# Unpack fields
pid, proposer, eta, start_block, end_block, for_votes, against_votes, canceled, executed = prop
eta_str = datetime.utcfromtimestamp(eta).strftime('%Y-%m-%d %H:%M:%S') if eta else "N/A"
targets, values, signatures, calldatas = actions

# Actions formatting
action_lines = []
for i in range(len(targets)):
    sig = signatures[i] if i < len(signatures) else "?"
    tgt = targets[i]
    action_lines.append(f"{i+1}. {sig} on {tgt}")

# Basic heuristics
flagged_transfer = any("transfer" in s.lower() and int(v) > 0 for s, v in zip(signatures, values))

# === REPORT ===
report = f"""
📘 Proposal Report #{pid}

🧑‍💻 Proposer: {proposer}
📈 Status: {state}
📅 Voting Period: block {start_block} → {end_block}
🗓️ ETA (execution time): {eta_str}

🎯 Actions:
""" + "\n".join(action_lines) + f"""

📊 Risk Assessment:
- Known risky functions used: {'⚠️ YES' if flagged_transfer else '✅ No obvious risks'}
- Voting stats: For = {for_votes}, Against = {against_votes}
- Proposer history: (to be implemented)
- Target contracts verified: (to be implemented)

🟢 Verdict: {"⚠️ Needs review" if flagged_transfer else "Likely safe"}
"""

# Output
print(report)
with open(f"proposal_report_{pid}.txt", "w") as f:
    f.write(report)