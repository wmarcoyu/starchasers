<h1>Working on another machine (CAEN)</h1>
1. Clone the repository from GitHub (with .githubPAT as password) <br />
2. Create a Python virtual environment: <code>python3 -m venv env/</code>.
Activate the virtual environment: <code>source env/bin/activate</code>.
Install Python packages: <code>python install -r requirements.txt</code>. 
Check for unsuccessful installations and install them manually. <br />
3. Download nodejs, e.g. node-v18.16.0-linux-x64. Set correct paths:
<code>export NODEJS_HOME=/home/wmarcoyu/Downloads/node-v18.16.0-linux-x64</code>
and <code>export PATH=$PATH:$NODEJS_HOME/bin</code>. Check that the paths 
are correctly set up: <code>node -v</code> and <code>npm -v</code>. Install
ReactJS packages: <code>npm install</code>. <br />
4. Build backend and frontend: <code>./bin/starchasers_run</code> and <code>
npx webpack --watch</code>