import personModel from "../Models/Client-PersonSchema.js";


export const setPerson = async (data) => {
    try{
        const {name,status} = data;
        const personExists = await personModel.findOne({name,status});
        if(personExists) throw new Error("Name already exists,Please enter a different name");
        const newPerson = new personModel(data);
        await newPerson.save();

    }catch(err){
        throw new Error(err.message);
    }
}

export const getPerson = async () => {
    try{
        const person = await personModel.find();
        return person;
    }catch(err){
        throw new Error(err.message);
    }
}

export const deletePerson = async (id) => {
    console.log(id  )
    try{
        const person = await personModel.findByIdAndUpdate(id,{active:false,archivedAt:new Date()},{new:true});
        if(!person) throw new Error("Person not found");
        return person;
    }
    catch(err){
        throw new Error(err.message);
    }
}
