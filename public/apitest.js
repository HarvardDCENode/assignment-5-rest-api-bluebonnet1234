// wrap in IIFE to control scope
(function(){

  const baseURL = 'http://localhost:8080';

  function testAPIs(){
    // test list first
    let testId = '';
    let testJSON = {};

    // list
    callAPI('GET', '/api/blogs', null, null)
      .then((list)=>{
        console.log('\n\n***************************\nlist results:');
        console.log(list);
        testId = list[0]._id;
      })
      .then(()=>{
        let data = {
          title: "Test Blog Title",
          detail: "Test Blog Detail"
        }        

        // create the POST call to the API
        callAPI('POST', '/api/blogs', null, data)
          .then((blog)=>{
            console.log('\n\n***************************\ncreate results:');
            console.log(blog);
            return blog;
          })
          .then((blog)=>{
            // find
            return callAPI('GET','/api/blogs/'+blog._id, null, null)
              .then((blog)=>{
                // output the result of the Promise returned by response.json()
                console.log('\n\n***************************\nfind results:');
                console.log(blog);
                return blog;
              })
          .then((blog)=>{
            // update detail
            blog.detail += ' appended by the AJAX API ';
            return callAPI('PUT','/api/blogs/'+blog._id, null, blog)
          .then((blog)=>{
            // output the result of the Promise returned by response.json()
            console.log('\n\n***************************\nupdate results:');
            console.log(blog);
            return blog;
          })
          .then((blog)=>{
            // now find again to confirm that the detail update was changed
            return callAPI('GET','/api/blogs/'+blog._id, null, null)
          })
          .then((blog)=>{
            // output the result of the Promise returned by response.json()
            console.log('\n\n***************************\nfind results (should contain updated detail field):');
            console.log(blog);
            return blog;
          })
          .then((blog)=>{
            //delete
            callAPI('DELETE', '/api/blogs/'+blog._id, null, null)
                .then((result)=>{
                console.log('\n\n***************************\ndelete result:');
                console.log(result);
                })
            });
        })
     })
    })
    .catch((err)=>{
      console.error(err);
    });
  }


  async function callAPI(method, uri, params, body) {
    jsonMimeType = {
      'Content-type':'application/json'
    }

    try{
      /*  Set up our fetch.
       *   'body' to be included only when method is POST
       *   If 'PUT', we need to be sure the mimetype is set to json
       *      (so bodyparser.json() will deal with it) and the body
       *      will need to be stringified.
       *   '...' syntax is the ES6 spread operator.
       *      It assigns new properties to an object, and in this case
       *      lets us use a conditional to create, or not create, a property
       *      on the object. (an empty 'body' property will cause an error
       *      on a GET request!)
       */
      const response = await fetch(baseURL + uri, {
        method: method, // GET, POST, PUT, DELETE, etc.
        ...(method=='POST' ? {body: body} : {}),
        ...(method=='PUT' ?  {headers: jsonMimeType, body:JSON.stringify(body)} : {})
      });
      // response.json() parses the textual JSON data to a JSON object. 
      // Returns a Promise that resolves with the value of the JSON object 
      //  which you can pick up as the argument passed to the .then()
      return response.json(); 
    }catch(err){
      console.error(err);
      return "{'status':'error'}";
    }
  }
//}


  document.querySelector('#testbtn').addEventListener("click", ()=>{
      testAPIs();
  });
})();
