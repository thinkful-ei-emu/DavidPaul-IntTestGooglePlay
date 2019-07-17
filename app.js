const express=require('express');
const morgan=require('morgan');
const app=express();
app.use(morgan('dev'));
const playstore=require('./playstore.js');

app.get('/apps',(req,res)=>{
  const {sort, genres} =req.query;
  if(!Object.keys(req.query).every(val => ['sort','genres'].includes(val) )){
    return res.status(400).send('Remove invalid query parameter')
  }
  let tempStore=[...playstore];

  let validGenres= ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card','adventure'];
  if(genres && !validGenres.includes(genres.toLowerCase()) ){
    return res.status(400).send('Need a valid genres parameter');
  }
  if(genres){
    tempStore=tempStore.filter(app=>app['Genres'].toLowerCase().includes(genres.toLowerCase()));
  }


  let validSort=['rating','app'];
  if(sort && !validSort.includes(sort.toLowerCase())){
    return res.status(400).send('Need a valid sort parameter');
  }
  if(sort){
    let sortCat=sort.charAt(0).toUpperCase()+sort.slice(1).toLowerCase();
    if(sortCat==='App'){
      tempStore.sort((a,b)=>a[sortCat]>b[sortCat]?1:-1);
    }
    else{
      tempStore.sort((a,b)=>a[sortCat]<b[sortCat]?1:-1);
    }
  }
  res.json(tempStore);
});

module.exports=app;