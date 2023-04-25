import Occurrences from "../models/Occurrence.js"

class OccurrenceController {
    static create = (req, res) => {
        let occurrence = new Occurrences(req.body);

        try {
            occurrence.save()
            res.status(201).json({
                message: 'Ocorrência criada com sucesso'
            })
        } catch(error) {
            res.status(500).json({
                message: error
            })
        }
    }

    static show = (req, res) => {
        let occurrence = new Occurrences(req.body);

        try {
            occurrence.save()
            res.status(201).json({
                message: 'Ocorrência criada com sucesso'
            })
        } catch(error) {
            res.status(500).json({
                message: error
            })
        }
    }

    static update = (req, res) => {
        let occurrence = new Ocurrences(req.body);

        try {
            occurrence.save()
            res.status(201).json({
                message: 'Ocorrência criada com sucesso'
            })
        } catch(error) {
            res.status(500).json({
                message: error
            })
        }
    }

    static delete = (req, res) => {
        let occurrence = new Occurrences(req.body);

        try {
            occurrence.save()
            res.status(201).json({
                message: 'Ocorrência criada com sucesso'
            })
        } catch(error) {
            res.status(500).json({
                message: error
            })
        }
    }
}

export default OccurrenceController