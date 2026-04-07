
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const removeMd = require('remove-markdown');

const app = express()
app.use(cors())
app.use(express.json())

const ANYthingLLM_URL = 'http://localhost:3001/api/v1'
const API_KEY = '4Q62SBA-3664E06-JKN20FZ-DMJGVQC'
const WORKSPACE_SLUG = 'farm-assistant'

app.post('/api/chat', async (req, res) => {
  try {
    const { message, mode = 'query' } = req.body

    console.log(req.body)
    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const response = await axios.post(
      `${ANYthingLLM_URL}/workspace/${WORKSPACE_SLUG}/chat`,
      { message, mode },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    )


    const plainText = removeMd(response.data.textResponse);
    return res.json(plainText)
  } catch (error) {
    console.error('Error calling AnythingLLM:', error.message)
    if (error.response) {
      console.error('AnythingLLM response data:', error.response.data)
    }
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Failed to reach AI Assistant' })
    }
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
