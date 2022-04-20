const core = require('@actions/core');

try {
  let branchName = '';
  let shouldDeploy = false;
  let ProdDeploy = false;
  let NonProdDeploy = false;
  const eventName = process.env.GITHUB_EVENT_NAME;

  // Fetch Branch Name
  if (eventName === 'pull_request') {
    branchName = process.env.GITHUB_HEAD_REF;
  } else if (eventName === 'push' || eventName === 'workflow_run') {
    branchName = process.env.GITHUB_REF.replace('refs/heads/', '');
  }

  // Validate and set branch Name
  const validBranchRegex = /(^(revert)-[0-9]{1,5}-(feature|bugfix|hotfix|onprem)\/(LSP|CB|AQRE|LP|ASE|SAP)-[0-9]{1,5}\/[0-9a-zA-Z_-]+$)|(^(feature|bugfix|hotfix|onprem)\/(LSP|CB|AQRE|LP|ASE|SAP)-[0-9]{1,5}\/[0-9a-zA-Z_-]+$)|(^(development|staging|production|qa|labs|onprem)$)|(snyk-\w*-\w*)/;
  if (!validBranchRegex.test(branchName)) {
    core.setFailed(`Branch Name should be in the regex format ${validBranchRegex}`);
  } else {
    core.setOutput('branch_name', branchName);
  }
 
  // Calculate should_deploy and set as output
  const deployableBranches = ['development', 'qa', 'staging', 'production', 'labs'];
  if(deployableBranches.includes(branchName)) {
    shouldDeploy = true;
  }
  core.setOutput('should_deploy', shouldDeploy);

  // Check if it's Staging or Productions or labs
  const ProdBranches = ['staging', 'production', 'labs'];
  if(ProdBranches.includes(branchName)) {
    ProdDeploy = true;
  }
  core.setOutput('prod_deploy', ProdDeploy);
  // Check if it's Dev or QA
  const NonProdBranches = ['development', 'qa'];
  if(NonProdBranches.includes(branchName)) {
    NonProdDeploy = true;
  }
  core.setOutput('non_prod_deploy', NonProdDeploy);
} catch (error) {
  core.setFailed(error.message);
}
