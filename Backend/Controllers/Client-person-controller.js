import { setPerson,getPerson,deletePerson } from "../Services/Client-Person.js";

export const setPersonController = async (req, res) => {
    try {
        // console.log(req.body);
        await setPerson(req.body);
        res.status(201).json({ message: "Data created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
    }


export const getPersonController = async (req, res) => {
    try {
        const person = await getPerson();
        // console.log("person",person);
        res.status(200).json(person);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const deletePersonController = async (req, res) => {
    try {
        await deletePerson(req.params.id);
        res.status(200).json({ message: "Person deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}