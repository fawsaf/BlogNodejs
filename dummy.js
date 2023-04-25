const func1 = ()=>
{
    console.log('task1');
}

const func2 = (callback) =>
{
    callback();
    console.log('task2');
}

func2(func1);

