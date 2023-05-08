import { FC, createContext, useContext, useState } from 'react'
import PodcastApi from '../api/app'
import { user } from '../contexts/users'

export const podContext = createContext(null)
export const podcast = () => useContext(podContext)

interface Props {
  children: any
}

const PodProvider: FC<Props> = ({ children }) => {

  const { prof } = user()
  const [docPercentage, setDocPercentage] = useState<number>(0)

  const createPod = async (title: string, description: string, category: string, author: string, posterURL: string, fileURL: string): Promise<{}> => {
    const userData = JSON.parse(localStorage.getItem('userCred') || '{}')
    const res = await PodcastApi.post('/podcast/post', {
      title, 
      description, 
      category, 
      author, 
      authorId: userData.uid, 
      posterURL, 
      fileURL
    }, {
      onUploadProgress: progressEvent => setDocPercentage(Number(Math.round(((progressEvent.loaded || 0) * 100) / (progressEvent.total || 0))))
    })

    return res
  }

  const updatePod = async (uid: string, title: string, description: string, author: string, posterURL: string) => {
    const res = await PodcastApi.post('/podcast/update', {
      uid, 
      title, 
      description, 
      author, 
      posterURL, 
    }, {
      onUploadProgress: progressEvent => setDocPercentage(Number(Math.round(((progressEvent.loaded || 0) * 100) / (progressEvent.total || 0))))
    })

    return res
  }

  const fullCollection = async () => {
    const res = await PodcastApi.get('/podcast/get', {
      params: {
        key: '', 
        value: ''
      }
    })

    return res
  }

  const formatedCollection = async (category: string) => {
    const res = await PodcastApi.get('/podcast/get', {
      params: {
        key: 'category', 
        value: category
      }
    })
    
    return res
  }

  const myCollection = async () => {
    const userData = JSON.parse(localStorage.getItem('userCred') || '{}')
    const res = await PodcastApi.get('/podcast/get', {
      params: {
        key: 'authorId', 
        value: userData.uid
      }
    })

    return res
  }

  const favourites = async () => {
    const user = await prof()
    const favourite = user.data.favourites
    
    const res = await PodcastApi.get('/podcast/get', {
      params: {
        key: 'id', 
        value: favourite
      }
    })
    
    return res
  }

  const deletePod = async (uid: string) => {
    const res = PodcastApi.get('/podcast/delete', {
      params: {
        uid
      }
    })
    console.log('removed successfully')

    return res
  }

  const value = {
    createPod,  
    updatePod, 
    fullCollection, 
    formatedCollection, 
    myCollection, 
    favourites, 
    deletePod, 
    docPercentage
  }

  return (
    <podContext.Provider value={value}>
      { children }
    </podContext.Provider>
  )
}

export default PodProvider