### Github Action

##### Features
* Fetches branch name as output
* Validates the branch naming convention with `/(^(feature|bugfix|hotfix)\/(LSP|CB)-[0-9]{1,5}\/[0-9a-zA-Z_-]+$)|(^(development|staging|production|qa|labs)$)/;`

##### Usage

```yaml
rules:
    name: Rules
    runs-on: ubuntu-latest
    steps:
      - name: Fetch Branch Name
        uses: aptyInc/gha-branch-name@0.1.0
        id: branch
      - name: Print branch Name
        run: echo "${{steps.branch.outputs.branch_name}}"
```