const express =require('express')

const path =  require('path')
const app = express()
const hbs=require('hbs')

const port=process.env.PORT || 3000

const geocode= require('./Utils/geocode.js')
const forecast = require('./Utils/forecast.js')

//define paths for express config
const publicDirPath=path.join(__dirname,'../public')
const templateDirPath=path.join(__dirname,'../templates/views')
const partialsDirPath=path.join(__dirname,'../templates/partials')

//set up hbs and views location
app.set('view engine', 'hbs')
app.set('views' , templateDirPath)
hbs.registerPartials(partialsDirPath)

//set up to serve content from public directory
app.use(express.static(publicDirPath))

app.get('',(req,res)=> {
    res.render('index',{
        title : 'Weather report',
        name:'Utkarsh Goel'
    })
})


app.get('/about',(req,res)=> {
    res.render('about',{
        title : 'About Page',
        name : 'Utkarsh Goel'
    })
})

app.get('/help',(req,res)=> {
    res.render('help',{
        title: 'Help Page',
        message : 'The help page.',
        name: 'Utkarsh Goel'
    })
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        title :  'Error 404',
        message : 'Help article not found.',
        name : 'Utkarsh Goel'
    })
})

app.get('/weather', (req,res)=> {
    if(!req.query.address)
    return res.send({
        error : 'Address is required.'
    })

    geocode(req.query.address,(error,{name, latitude, longitude}={})=> {
        if(error)
            return res.send({error})
        forecast(latitude,longitude, (error,data) => {
            if(error)
                return res.send(error)
            res.send({
                forecast :data.current,
                location : name
            })
        }) 
    })
})


app.get('/*',(req,res) => {
    res.render('error',{
        title :  'Error 404',
        message : 'Page not found.',
        name : 'Utkarsh Goel'
    })
})


app.listen(port,()=>{
    console.log('Server is Up on port '+port)
})

