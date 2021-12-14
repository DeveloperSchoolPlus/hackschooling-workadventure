# Fork of Workadventure

As private fork are not allowed by github, a few steps are required to be able to use this repository as a regular fork

### How to stay up to date
##### Configure the original repo as one of your remote URL

```git remote add upstream https://github.com/thecodingmachine/workadventure.git```

##### Disable push for this remote ( You're not allowed to push anywat )

```git remote set-url --push upstream DISABLE```

##### Fetch the original repo on a regular basis

```
git fetch upstream
git rebase upstream/develop
```  
