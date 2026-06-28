import app from './src/app'
import { config } from 'dotenv'

config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
});