import React from 'react';

const Blogs = () => {
    return (
        <div className="min-h-[500px] text-center">
            <h1 className="font-bold text-3xl">How will you improve the performance of a React Application?</h1>
            <p>React is one of the most popular front end development framework. It is also known as the best framework for performance. But we can improve more by doing some extra techniques. We all know if a parent component re-render than it's childs also re-render. But if we split our preffered part into another component than it will make some improvements. Another technique is to render image using lazy loading. We can render if the image is already loaded and that will boost our react app performance.</p>
            <h1 className="font-bold text-3xl">What are the different ways to manage a state in a React application?</h1>
            <p>There are mainly two ways to manage a state in a React application useState and useEffect. useState hook give us the ability to change any state in the application. By useState we can change the site data fast which will be very useful for our development. On the other hand useEffect tracks the state and make a side effect. By this we can always keep track of the current state and update our desire to update anything. Some the other state ways to manage state is Redux, useReducer, Context Api</p>
            <h1 className="font-bold text-3xl">How does prototypical inheritance work?</h1>
            <p>Prototypical inheritance means an object can use or inherit properties form another object. It means we can joint multiple object properties by prototypical inheritance. To inherit we have to use __proto__ as a key where we want to inherit and it's value will be the object name. By this  two objects properties can be shared. We can also get higher level object by chaining if it's already extended, otherwise we will get null</p>
            <h1 className="font-bold text-3xl">Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts</h1>
            <p>We cannot directly change the state becase it is immutable. If we chane the state directly than we will lose the control on the state and it will cause problems. For this useState hook gave us a setState function. By using this we can get the proper value of the current state. Another cons of directly changing the state is it doesn't change the state immediately.</p>
            <h1 className="font-bold text-3xl">You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h1>
            <p>const filtered = array.filter(product =&gt; product.name.includes('Our Searching Keyword'))</p>
            <h1 className="font-bold text-3xl">What is a unit test? Why should write unit tests?</h1>
            <p>Unit tests are those tests were tests run by developers and make sure that the test maintains the design and behavior. It is very helpful to software developments. It's split the program code and shows the part which is correct or not. By this it helps us to find the problem effectively so we can solve fast. Web developers also get benefited by this because it helps us to find bugs</p>
        </div>
    );
};

export default Blogs;