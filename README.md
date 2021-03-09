# shareholderBlockchain
A dApp where companies can deploy a smart contract for shareholders to make transparent, secure, and tamper-proof decisions.  

Instructions on how to deploy:

Step 1) (Required software)
The following are the softwares required to deploy the smart contract:
a.) Node.js and npm 
b.) Npm install web3 (web3 js)
c.) Truffle ganache (download stable truffle ganache desktop app) 
d.) Npm install -g truffle (truffle) 
e.) Metamask extension 

Step 2)
Create a new workspace in Granache. 

Step 3) (Configure truffle-confiq.js using Ganache.)
Ensure port number and network id matches in truffle-config.js as seen in screenshot of
Granache setup:
1.	Select extension icon, select metamask extension
2.	Select “No, I already have a seed phrase”.
3.	Copy mnemonic from ganache and add as seed phrase, create new password and confirm password
 
4.	Select metamask networks from the dropdown
5.	Select custom RPC
6.	Enter the following credentials and make sure they match
 

 



Step 4) (Configuring MetaMask)
Click chrome extension and select MetaMask. Fill in the details as shown below. For your convenience, enter a random chainId and upon the prompt as shown below, change the chainId to match the one given by the prompt. 
 



 




Step 5) (Creating new test cases)
Edit the following code below in Election.sol to create new test cases. Voters will take in 2 parameters, address and number of shares.
 
Addresses of shareholders can be obtained from Granache.
 

Step 5.) (Launching of Voting platform)
Under Command prompt, go to dir /Voting.
Run “truffle compile” into the command prompt.
Run “truffle migrate” into the command prompt.
Run “npm run dev” to launch the dApp.
MetaMask will prompt you to connect with MetaMask.
Click “Next”.
Click “Connect”.
Click refresh on your brower.


Step 6) (Test cases)
Using one of the accounts, choose a vote(For, against, abstain) and click “vote”.
Metamask would prompt a transaction. Click “confirm”. The number of votes would increase by the number of shares.
 
Step 7) (Using different accounts to cast vote)
Click MetaMask extension and select the pie chart on the top right. 
Select “Import account”.
Select private key belonging to one of the addresses that is added in step 4. You can do this via Granache and clicking the key icon on the extreme right. Next, copy the private key in the text box.
 
Input the private key obtained from Granache into MetaMask.
 
Click “Import”.
In MetaMask extension, click “Not connected”  followed by connecting to the new account you just added.
 
The voting platform should now have the updated account address, ready to vote.
 
Click an option of your choice and click confirm when MetaMask prompts you with a transaction. The Voting result should be updated with the new voting result.
 Additional procedures(If encounter errors):
To re-initialize the smart contract, open command prompt/terminal. Run the command “truffle migrate --reset”.
Due to block delay, you may need to refresh the browser an additional time.


