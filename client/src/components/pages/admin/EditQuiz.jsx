import { Add, ArrowDropDown, Cloud, UploadFile } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import axios from 'axios'
import LoadingModal from '../../utils/Loader'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { calcMarks } from '../../utils/libs/calcMarks'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../../config'
const ExcelModal = lazy(() => import('../../modals/ExcelModal'))

export default function EditQuiz () {
  const {
    data: []
  } = useSelector(s => s.quiz)
  const [ModalClose, setModalClose] = useState(true)
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const { id } = useParams()
  const [isVisible, setIsVisible] = useState(false)
  const [currentMarks, setCurrentMarks] = useState(0)
  const [maxMarks, setMaxMarks] = useState(0)
  const [formData, setFormData] = useState({
    quizId: id,
    question: '',
    image: '',
    marks: 0,
    category: '',
    answer: 0,
    options: []
  })

  const getQuiz = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/quiz/${id}`)
      if (res.data) {
        setCurrentQuiz(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getQuiz()
  }, [])

  useEffect(() => {
    setMaxMarks(currentQuiz?.marks)
    setCurrentMarks(calcMarks(currentQuiz ? currentQuiz.questions : []))
  }, [currentQuiz])

  const generateUsingGemini = async () => {}

  return (
    <section className='flex flex-col gap-5'>
      {currentQuiz == null ? (
        <div className='h-screen w-screen fixed justify-center flex items-center bg-opacity-20 bg-black left-0 top-0 z-[2999] '>
          <CircularProgress size={'27px'} />
        </div>
      ) : (
        <div className='flex shadow-sm rounded-md bg-white p-5 justify-between'>
          <div className='flex flex-col gap-1'>
            <small>
              <b>{currentQuiz.title}</b>{' '}
              <i>
                {!currentQuiz.isAvailable ? '  Currently Not Available' : ''}
              </i>{' '}
            </small>
            <small>
              Current Marks : {currentMarks} / {maxMarks}
            </small>
          </div>
          <div className='flex gap-2 items-center'>
            <Button onClick={() => setModalClose(false)} variant='outlined'>
              Upload Excel <Cloud sx={{ marginLeft: '10px' }} />
            </Button>
            <Button
              onClick={() => setIsVisible(!isVisible)}
              variant='contained'
            >
              Upload JSON <UploadFile sx={{ marginLeft: '10px' }} />
            </Button>
          </div>
        </div>
      )}
      <section className='p-5 bg-white flex-col flex gap-1'>
        {!(currentQuiz?.questions.length == 0) ? (
          currentQuiz?.questions.map((item, index) => (
            <div key={index} className=''>
              <Accordion className=''>
                <AccordionSummary
                  expandIcon={<ArrowDropDown />}
                  sx={{
                    display: 'flex', // Flex container
                    flexDirection: 'row-reverse', // This moves the expand icon to the left
                    alignItems: 'center' // Center-align content
                  }}
                >
                  <div className='flex w-full justify-between'>
                    <small className='flex gap-1'>
                      {' '}
                      Question {index + 1} <p className='ml-2' > {item.question}</p>
                    </small>
                    <small>
                      <i>{item.marks + ' '} Marks</i>
                    </small>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className='flex flex-col'>
                    {item.category == 'Text' && (
                      <TextField
                        label='Answer'
                        value={item.answer}
                        variant='standard'
                      />
                    )}
                    {item.category == 'MCQ' && (
                      <>
                        {item.options.map((i ,k) => (
                          <div
                            key={k}
                            className='flex gap-2 items-center'
                          >
                            <input type="text" value={i.text}  name="" id="" />
                            <input type="radio" checked={i.isCorrect} id="" />Is Correct
                            {i.image ? <img src={i.image} /> : <small>No Image</small>}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <div className='flex mt-1 justify-end'>
                    <Button variant='contained'>Save</Button>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ))
        ) : (
          <small>No Questions to display</small>
        )}
      </section>

      <AddQuestion
        setCurrentMarks={setCurrentMarks}
        maxMarks={maxMarks}
        currentMarks={currentMarks}
        formData={formData}
        setFormData={setFormData}
      />
      {!ModalClose && (
        <Suspense fallback={<LoadingModal />}>
          <ExcelModal id={id} setModalClose={setModalClose} />
        </Suspense>
      )}
    </section>
  )
}

const AddQuestion = ({
  onSubmit,
  setCurrentMarks,
  currentMarks,
  formData,
  setFormData,
  maxMarks
}) => {
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState('')

  const changeHandler = e => {
    const { name, value, type, files } = e.target

    if (name === 'marks' && value) {
      const markDiff = parseInt(value) - parseInt(formData.marks || 0)
      setCurrentMarks(prev => prev + markDiff)
    } else if (!value) {
      setCurrentMarks(prev => prev - parseInt(formData.marks || 0))
    }
    if (type === 'file' && files.length > 0) {
      const file = files[0]
      setFormData({ ...formData, [name]: file })
      setPreview(URL.createObjectURL(file))
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const validateForm = () => {
    const { marks, question, category } = formData
    if (!question || !category || !(marks && marks <= maxMarks)) {
      alert(
        'Please ensure all fields are valid and marks do not exceed maxMarks.'
      )
      return false
    }
    return true
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const questionData = new FormData()
    questionData.append('question', formData.question)
    questionData.append('category', formData.category)
    questionData.append('marks', formData.marks)
    questionData.append('image', formData.image)
    questionData.append('answer', formData.answer)
    questionData.append('quizId', formData.quizId)

    if (validateForm()) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/quiz/add/question`,
          questionData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
      } catch (error) {
        console.log(error.message)
      }
    }

    setLoading(false)
  }
  const handleFullScreen = () => {
    const imageElement = document.getElementById('preview-image')
    if (imageElement.requestFullscreen) {
      imageElement.requestFullscreen()
    } else if (imageElement.webkitRequestFullscreen) {
      imageElement.webkitRequestFullscreen()
    } else if (imageElement.msRequestFullscreen) {
      imageElement.msRequestFullscreen()
    }
  }
  return (
    <form
      className='items-center space-y-3 p-5 bg-white'
      onSubmit={handleSubmit}
    >
      <div className='items-center flex-wrap gap-3 min-h-10 flex'>
        <TextField
          onChange={changeHandler}
          name='quizId'
          value={formData.quizId}
          variant='standard'
          label='Quiz ID'
          disabled
          required
        />
        <TextField
          onChange={changeHandler}
          value={formData.question}
          name='question'
          sx={{ width: 340 }}
          variant='standard'
          label='Question text'
          required
        />
        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={changeHandler}
            name='category'
            variant='standard'
            required
          >
            <MenuItem value='MCQ'>MCQ</MenuItem>
            <MenuItem value='MSQ'>MSQ</MenuItem>
            <MenuItem value='Text'>Text</MenuItem>
          </Select>
        </FormControl>
        {formData.category === 'Text' && (
          <TextField
            onChange={changeHandler}
            value={formData.answer}
            name='answer'
            type='text'
            variant='standard'
            label='Answer'
            required
          />
        )}
        <TextField
          onChange={changeHandler}
          value={formData.marks}
          name='marks'
          error={maxMarks < currentMarks}
          type='number'
          variant='standard'
          label='Marks'
          required
        />

        <Button type='button' className='relative w-28' variant='contained'>
          <input
            name='image'
            type='file'
            className='opacity-0 absolute'
            onChange={changeHandler}
          />
          <UploadFile />
        </Button>
        {preview && (
          <img
            id='preview-image'
            onClick={handleFullScreen}
            className='h-44'
            src={preview}
            alt='Preview'
          />
        )}
      </div>

      <div>
        <TextField></TextField>
      </div>
      <Button type='submit' variant='contained' color='primary'>
        Add Question <Add />
      </Button>

      {loading && <LoadingModal />}
    </form>
  )
}
