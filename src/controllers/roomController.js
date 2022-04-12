const Database = require("../db/config")

module.exports = {
   async create(req, res){
    const db = await Database()
    const pw = req.body.password
    let roomId
    let isRoom = true
    
    while(isRoom) {
      // gerar numero da sala
      for(var i = 0; i < 6; i++){
        i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
        roomId += Math.floor(Math.random() * 10).toString()
      }

      // verificar se numero da sala existe
      const roomExistIds = await db.all(`SELECT id FROM rooms`)
      isRoom = roomExistIds.some(roomIdExists => roomIdExists === roomId)
  
      // insere sala no banco
      if(!isRoom){
        await db.run(`INSERT INTO rooms(
          id,
          pw
          ) VALUES (
          ${parseInt(roomId)},
          "${pw}"
          )`)
      }

    }
    
    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res){
    const db = await Database()
    const roomId = req.params.room
    const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
    const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)
    let isNoQuestions

    if(questions.length == 0){
      if(questionsRead.length == 0){
        isNoQuestions = true
      }
    }

    res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions})
  },

  enter(req, res){
    const roomId = req.body.roomId

    res.redirect(`/room/${roomId}`)
  }
}