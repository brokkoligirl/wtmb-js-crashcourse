<template>
  <div class="page-container">
    <noscript>
      <strong>We're sorry but frontend doesn't work properly without JavaScript enabled. Please enable it to
        continue.</strong>
    </noscript>
    <header>
      <h1><a href="/">Let's eat!</a></h1>
    </header>

    <div class="sidebar">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/users">FoodSnobs</router-link>
      <router-link to="/restaurants">Restaurants</router-link>
    </div>
    
    <div class="content-container">
      <router-view/>
       <div id="app"></div>
           <!-- built files will be auto injected -->
    </div>
     <footer>
      <h4>(c) international brunch conspiracy</h4>
    </footer>
  </div>

</template>

<style>
  header {
    background-color: rgb(151, 42, 98);
    margin: 0;
    padding: 20px 30px 30px 3%;
    color: rgb(244, 235, 238);
    font-size: 36pt;
  }

  header h1,
  header h1 a,
  header h1 a:visited,
  header h1 a:active,
  header h1 a:hover {
    color: #F4EBEE;
    font-size: 36pt;
    font-family: 'Armata', sans-serif;
    text-decoration: none;
  }

  footer {
    background-color: rgb(151, 42, 98);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    /* Footer height */
    padding: 5px 10px 10px 3%;
  }

  footer h4 {
    color: #F4EBEE;
    font-size: 12
  }

  .page-container {
    background-color: rgb(244, 235, 238);
    font-family: 'Armata', sans-serif;
    position: relative;
    min-height: 100vh;
  }

  .content-container {
    padding-left: 15px;
    padding-right: 5px;
    padding-bottom: 40px;
    /* Footer height */
  }

  /* The sidebar navigation menu */
  .sidebar {
    margin: 0;
    padding: 0 0 0 5px;
    width: 100%;
    background-color: rgba(151, 42, 98, 0.9);
    position: relative;
    height: auto;
    overflow: auto;
  }

  /* Sidebar links */
  .sidebar a {
    display: block;
    color: #F4EBEE;
    padding: 16px;
    text-decoration: none;
    float: left;
  }

  /* Active/current link */
  .sidebar .active,
  .sidebar a:hover {
    background-color: rgb(151, 42, 98);
    color: #F4EBEE;
  }
  h1 {
    font-family: 'Armata', sans-serif;
    text-decoration: none;
    color: rgb(151, 42, 98);

  }
</style>