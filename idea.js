const express=require('express');
const app=express();
const fs=require('fs');
 
function getevents() {
    try {
        const data = fs.readFileSync('./data/events.json');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing JSON:', error);
        return [];  
    }
}
function getreg() {
    try {
        const data = fs.readFileSync('./data/registrations.json');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing JSON:', error);
        return [];  
    }
}
function getcount() {
    try {
        const data = fs.readFileSync('./data/count.json');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing JSON:', error);
        return [];  
    }
}
const create_events=(req,res)=>{
    const events=getevents();
    const count=getcount();
    const newid=events.length>0?events[events.length-1].eventid+1:1;

    const newevent=Object.assign({eventid:newid},req.body);
    const newcount={
        eventid:newid,
        count:0
    };
    count.push(newcount);
    events.push(newevent);
    fs.writeFile('./data/count.json',JSON.stringify(count,null,2),(err)=>{
        if(err){
            return res.status(500).send('Error saving data');
        }
    });
    fs.writeFile('./data/events.json',JSON.stringify(events,null,2),(err)=>{
        if(err){
            return res.status(500).send('Error saving data');
        }
        res.send(newevent);
    });

};
app.use(express.json());

app.post('/api/events/create',create_events);
app.post('/api/events/register/:id',(req,res)=>{
    const id=req.params.id*1;
    const reg=getreg();
    const events=getevents();
    const count=getcount();

    const ans_count = count.find(m => m.eventid === id);
    const ans_event = events.find(m => m.eventid === id);

    if(ans_count.count>=ans_event.capacity){
        res.send("Registration form is closed");
    }else{
    ans_count.count++;
    const newid=ans_event.eventid;
    fs.writeFileSync('./data/count.json', JSON.stringify(count, null, 2)); 
    const newreg=Object.assign({eventid:newid},req.body);
    reg.push(newreg);
    fs.writeFile('./data/registrations.json',JSON.stringify(reg,null,2),(err)=>{
        if(err){
            return res.status(500).send('Error saving data');
        }
        res.send(newreg);

    });}
    

});

app.put('/api/events/update/:id',(req,res)=>{
    const id=req.params.id*1;
    const events=getevents();
    const ans_event = events.find(m => m.eventid === id);
    if (!ans_event) {
        return res.status(404).send('Event not found');
    }
    const index = events.findIndex(m => m.eventid === id);
    const update=Object.assign(ans_event,req.body);
    events[index]=update;
    fs.writeFileSync('./data/events.json', JSON.stringify(events, null, 2)); 

    res.send(update);
})
app.delete('/api/events/:id',(req,res)=>{
    const id=req.params.id*1;
    const events=getevents();
    const count=getcount();
    const reg=getreg();
    const ans_event = events.find(m => m.eventid === id);
    if (!ans_event) {
        return res.status(404).send('Event not found');
    }
    const index = events.findIndex(m => m.eventid === id);
    events.splice(index,1);
    const index_c = count.findIndex(m => m.eventid === id);
    count.splice(index_c,1);
    const updatedreg = reg.filter(m => m.eventid !== id);

    fs.writeFileSync('./data/events.json', JSON.stringify(events, null, 2)); 
    fs.writeFileSync('./data/count.json', JSON.stringify(count, null, 2)); 
    fs.writeFileSync('./data/registrations.json', JSON.stringify(updatedreg, null, 2)); 

    res.status(204).send();
})
app.get('/api/events/all',(req,res)=>{
    const events=getevents();
    if(events.length<=0){
      return res.status(404).send('No Events are available');
    }  
     res.send(events);

})
app.get('/api/events/:id',(req,res)=>{
    const id=req.params.id*1;
    const events=getevents();
    const ans_event = events.find(m => m.eventid === id);
    if (!ans_event) {
        return res.status(404).send('Event not found');
    }
    res.send(ans_event);

})


const port=8000;
    app.listen(port,()=>{
        console.log('server started');
    });