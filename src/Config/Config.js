const srch = async (page,country,category)=>{
    try{
    const url=`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${import.meta.env.VITE_APP_ID}&page=${page}`;
    const response= await fetch(url);
    const data= await response.json();
     return data;
    }
    catch(error){
    }
    }
     export default srch;