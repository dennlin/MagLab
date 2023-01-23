# Mag Lab Ground Space Weather Sensor Package - Frontend 

The frontend code handoff document for the Ground Space Weather Sensor Package project.

## Project Information

Ground Space Weather Sensor Package (known colloquially as Ground Mag) is a project based out of Professor Mark Moldwin's [Mag Lab](https://space.engin.umich.edu/research.php) at the University of Michigan. We're attempting to create a large scale network of low-cost, effective magnetometers that can monitor [space weather](https://en.wikipedia.org/wiki/Space_weather) activity.

The current website (frontend code) is deployed here: https://esoteric-energy-359215.uk.r.appspot.com/. The remote version of the backend code is currently deployed on my own personal GCP account as we never got around to migrating it to the official lab account. Thus, if you need to create that new server, feel free to ping me and we can work through it together! This the the UMich GCP support email: gcp.support@umich.edu

## Frameworks and Libraries

The frontend is built using [React](https://reactjs.org/) and the interface is designed using [Material-UI](https://mui.com/). Supplemental features include the use of several APIs and frameworks such as [Google Maps API](https://developers.google.com/maps). 

### Important!!!!
Since starting the project, Material UI has updated their code quite dramatically. They officially rebranded their name to MUI instead of Material UI. Thus, they decided to change ALL of their imports to use `mui` instead of `@material-ui`. Thus, when reading documentation, if you ever want to copy code from the demos, change the __import statements__ from using `mui` to `@material-ui` as follows `import Button from mui/core` to `import Button from @material-ui/core`. If you don't want to do this, you can upgrade Material UI and then deal with changing the past import statements and ALSO - more crucially - dealing with *version conflicts* between packages which is REALLY ANNOYING to fix, so I'd suggest against this... 

It's important to be very familiar with React and Material UI (or Reactstrap/Bootstrap) before you start this project. The frontend is purely coded in React and in order to understand how to add, delete, update things, you'll need to understand the general flow, code organization standards, etc. that are part of the standards of coding in React.

## Code Organization

There is some legacy code in the frontend repository. As I didn't want to delete this, I kept it there and instead created a directory called `src/v2` that holds all the code I've worked on for the last year. This means that you can ignore the `src/components` and `src/services` directories. Another file you should be aware of is `src/AppV2.js`. __Ignore__ `src/App.js`. This is the legacy version of the `AppV2.js` file.

You can also ignore the `/build` and the `/public` directories for now. 

- `src/calendar`: Holds all files that correspond to the calendar component. Once you click into a magnetometer station, you can access this calendar.
- `src/dashboard`: The landing page. Essentially the homepage.
- `src/maps`: Holds all files corresponding to the maps component. This is the part that integrates the Google Maps API.
- `src/redux`: This section isn't one that can be described as a visual component to the web application. If you're familiar with redux, this is where that code along with the API endpoints/HTTP methods are coded. If you're not familiar with redux, check out the [official documentation](https://react-redux.js.org/). If you're not familiar with HTTP methods (get, post, put, patch, etc.), here's a good Medium [article](https://medium.com/@9cv9official/what-are-get-post-put-patch-delete-a-walkthrough-with-javascripts-fetch-api-17be31755d28) explaining them briefly. 
- `src/topBar`: The sticky top bar at the top of the page. 
- `src/util`: Holds general components that are used. For example, one important file here is `MainLayout.js`. It defines a wrapper component that allows you to pass in another component so that it can be displayed with the top nav bar on top of the component. 
- `AppV2.js`: The main file that brings all the components together. This is where all the components are tied together to specific URL routes. For example, for the `/maps` route, the `<MapContainer>` is displayed.

## Code Cleanliness

I've attempted to make the code as clean as possible. __Please try and keep this standard if possible. It'll make development/making code changes much easier!__ A couple of notes on standards to try and continue:

- In `AppV2.js`, I defined a `theme` using the `createTheme` Material UI (MUI) built-in function. This allows us to define a "design palette" for the entire application. For example, if you create a new page that you want to add, you don't have the manually change the background color to match the other colors. Instead, you should do this: `background: theme.palette.primary.main`. However, since we've decided to use a theme, you __must__ define your CSS information within the React file and not in a separate CSS file (at least for the values that require the use of the `theme`). This is done through MUI's `makeStyles` function. Its best to take a look at the documentation and the existing code to understand how to use it. Generally, the steps are defining the `useStyles` constant, creating a const (i.e. in my code, this variable is often called classes) within the functional component that calls the `useStyles` function, and then using it as follows: e.g. `<div className = {classes.[defined attribute in the makeStyles]}>`.
- Along those lines, I've also defined a `GRADIENT` variable that holds all the colors for the legend and the dot colors on the map. Just reference the GRADIENT when such a color scheme is needed. Again, check `src/maps/Legend.js` to see how it can be used.

- In addition, MAKE SURE you keep code organization at the forefront of your mind as you create new components. You'll want to create a separate file and even potentially a separate directory for every component you create. Don't be afraid of nesting directories or creating a new one. 

## Google Maps

Google Maps API is configured to be used with more than just React, so we need to employ a wrapper package to tailor use for React. This is that [package](https://github.com/google-map-react/google-map-react). Their documentation does a good job of explaining how to use it. A lot of development in this stage is just trying to insert a code snippet and seeing how/if it affects the code in the way you want it to.

If you need more info, I would just look online for information about usage, but I'll leave a couple of important hints here...
- API Key: _________. KEEP THIS PRIVATE! Do NOT share this API key. It's essentially the "password" for our application to use the Google Maps API. If this gets out to the public, then everyone will be able to use our connection to Google Maps. This will drive our usage bill way up... Just be careful who is able to see this. For example, don't push your code to a public repository. Work in private repositories or the gitlab repo provided.
- Accessing the online console: https://console.cloud.google.com/. Go here and login w/ your UMich gmail account. If you've been added to the group, you should have access.

## Deployment to Google Cloud (GCP)

Whenver you make changes to your code, follow the following steps to push code into GCP:
1.  Click on the activate cloud shell button in the top right of GCP project homepage.
2.  The current git remote repo is: https://gitlab.eecs.umich.edu/anrigu/magLab-frontend.git. If it is still this, just do git pull.
3.  Then run `npm run build`
4.  Run `gcloud app deploy` and select Y for all the options that pop up.
5.  `gcloud app browse` will display the URL for your site!

## Redux
The following is a quick overview of the functionaity of Redux. However, you'll have to look at the code and documentation if you'd like to understand how to implement. This is a relatively more advanced part of frontend development, so I would advise avoiding diving into this until you're more comfortable with the design aspect of frontend development. 

The frontend connection to the backend is done through APIs. There are a few very key API "protocols" that you need.
1\. get → Get data from the backend/database.
2\. post → Send data to the backend/database (e.g. login info).
3\. delete → Delete data.
4\. put → Not as important but like a post request with some subtle differences.

React-Redux is a framework we can use to implement these API protocols so that you can interact with the backend. Redux also has some other functionalities, one of which is called a universal state.

### State
Suppose a user is browsing the Map looking for a magnetometer to click on. He clicks on a magnetometer in San Francisco with the `id: 1abc`. The user is then redirected to the calendar component. At this point, the application needs to know where to go and retrieve the data that corresponds to the data from this specific magnetometer. In the code, the calendar component and the map component are defined in separate files, so how do we signal to the map component what the id is? React has some built in ways to pass data (e.g. props) but Redux makes it easier to do this. What you can do is save the magnetometer id from the map component into an application state, essentially a storage for data that the ENTIRE frontend application and all the components can access. This is useful for sending information to the backend as well.

### Actions/Reducers

Redux also provides an ability that allows you to make calls to the backend automatically on certain triggers. Actions/Reducers are responsible for this. For example, if you want to trigger the retrieval of data for the calendar component, you call an action function. In simple terms, this allows you to trigger a call to the backend to retrieve the data.

### History
One important feature of the frontend is history. This is essentially how you navigate from page to page. For example, if you want a button to redirect you to a different page, you can call `history.push("/maps")` if you want the user to be redirected to the maps page. 

## Notable Packages' Version Information
```
react: "^18.2.0",
@mui/material: "^5.10.15",
react-redux: "^7.2.6",
google-map-react: "^2.2.0",
react-awesome-calendar: "^1.0.14",
rxjs: "^7.5.7"
```

## Git Usage

### `git clone`

Open up a local terminal and navigate to a directory in which you'd like to store the app. Below is an example of cloning the app to the path `Projects/MagLab/MagLabFrontend/`
```
cd Projects/MagLab/
mkdir MagLabFrontend/
cd MagLabFrontend/
git clone https://gitlab.eecs.umich.edu/anrigu/magLab-frontend.git
mv magLab-frontend/* .
```

### `npm install`

Installs all packages and dependencies listed in [package.json](https://gitlab.eecs.umich.edu/anrigu/magLab-frontend/-/blob/main/package.json)

### `npm run start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

## Helpful Hints
Installing [Github Desktop](https://desktop.github.com/) or similar applications can help simplify the version control process<br/>
**Note: If you choose to use such an app, the cloning process is slightly simplified.**

### Adding a new package
Suppose you wanted to add a new package. Let's say a different calendar [package](https://www.npmjs.com/package/react-calendar). You'll often see a link that is `npm i/install [package name]` Run this command with the slight modification of `npm install [package name] --save` in the terminal --> The save at the end is important! You should see the package pop up in package.json, meaning it was installed properly. If you have version conflict issues with other packages, an easy way to bypass it is to rerun the install command with `--legacy-peer-deps`. This can be dangerous and I would be cautious with using this, but I have used it myself a couple of times, so it's definitely a useful way to bypass npm package install issues.

Open the app and navigate to `File/Clone Repository`.
<br/>Select the cloned location on your machine and give `https://gitlab.eecs.umich.edu/anrigu/magLab-frontend.git` as the URL path to the remote git repository.

*If you so choose, you can change path location on your machine using terminal commands*

### Pushing and pulling
#### Terminal

*The first command adds all changed files to the commit stage and then commits them to your local repository. <br/>
The second command pushes the files to the remote repository.*
```
git add -A && git commit -m "Your Message"
git push
```

#### Version control app

*Simply select the files you choose to commit. Add a message and then commit and push.*

For more information git commands: [here](https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html)

#### Notable useful git commands:
`git restore .` - Deletes all changes you've made to your **local** copy of the code. If you've made any changes to your code and it becomes unsalvageable, simply go to the command line and type in `git restore .` and the code will return to the local repository code.  
`git status` - Lists the status of the application regarding files you've updated/changed.

Last updated: 12/21/2022
Feel free to message [Anri Gu](mailto:anrigu@umich.edu?subject=Ground%20Mag%20GitLab%20Issues)

