async function sayHello(){
    console.log("waiting for 3 seconds")
    await new Promise (resolve => setTimeout(resolve, 3000));
    console.log("Hello, Async!");
}
sayHello();