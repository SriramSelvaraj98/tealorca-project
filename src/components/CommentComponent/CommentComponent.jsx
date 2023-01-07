import React, { useState } from 'react'
import {Grid, Stack} from '@mui/material'
import './commentcomponent.css'
import DeleteDialogComponent from '../DeleteDialogComponent/DeleteDialogComponent'

const CommentComponent = () => {
  const [state, setState] = useState({
    heading:"EnterComments",
    comments:[
      {
        comment:'first comment',
        repliedComment:[],
      },
      {
        comment:'second comment',
        repliedComment:[]
      }
    ]
  })
  const[inputValue, setInputValue] = useState('')
  const [inputerror, setInputerror] = useState(false)
  const [mouseOverIndex, setMouseOverIndex] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [selectedIndexForReply, setSelectedIndexForReply] = useState(null)
  const [selectedInputChange, setSelectedInputChange] = useState()
  const [replyInput, setReplyInput] = useState('')

  const onChangeOfInputValue = (e) =>{
    setInputValue(e.target.value)
    setInputerror(false)
  } 

  const onClickOnAddCommentButton = () => {
    if(!inputValue){
      setInputerror(true)
    }else{
      let addingCommentObject = {
        'comment': inputValue
      }
      const value = state.comments
      value.push(addingCommentObject)
      setState({
        ...state,
        comments:value
      })
      setInputValue('')
    }
  }

  const onClickOnEditOrDeleteOrReply = (index, type, comment) =>{
    console.log('ijdex', type, index)
    if(type == 'delete'){
      setDialogOpen(true)
      setSelectedIndex(index)
    }else if(type=='edit'){
      setSelectedInputChange(comment)
      setSelectedIndex(index)
    }else{
      setSelectedInputChange(comment)
      setSelectedIndexForReply(index)
    }
  }

  const onClickOnEditComment = () =>{
    const editedComment = state.comments.map((item, index)=>{
      if(index === selectedIndex){
        return{
          ...item,
          comment:selectedInputChange
        }
      }else{
        return{
          ...item
        }
      }
    })
    setState({
      ...state,
      comments:editedComment
    })
    setSelectedIndex(null)
  }

  const onClickOnCancel = () =>{
    setDialogOpen(false)
    setSelectedIndex(null)
  }

  const onClickOnDelete = () =>{
    setDialogOpen(false)

    const deleteSelectedComment = state.comments.filter((item, index) => index !== selectedIndex) 
    
    setState({
      ...state,
      comments:deleteSelectedComment
    })

    setSelectedIndex(null)
  }

  const  onClickOnReply = () => {

    const repliedComment = state.comments.map((item, index)=>{
      if(index === selectedIndexForReply){
        return{
          ...item,
          repliedComment : [...item.repliedComment,
            {
              repliedComments : replyInput
            }
          ]
        }
      }else{
        return{
          ...item,
        }
      }
    })
    setState({
      ...state,
      comments:repliedComment
    })
    setSelectedIndexForReply(null)
  }
  
  return (
    <div>
      
      <Grid container className='comment-component-main-container'>
        <Grid container>
         <b> {state.heading}</b>
        </Grid>
        <Grid container style={{marginTop:"10px"}}>
          <Grid item>
            <Stack>
            <input value={inputValue} onChange={onChangeOfInputValue} />
            {inputerror && <span style={{color:"red"}}>Please Enter Input Field</span> }
          </Stack>
          </Grid>
          <button onClick={()=>onClickOnAddCommentButton()} className='comment-adding-button'>{"Add comment " + ' >'}</button>
        </Grid>
        {
          state.comments.map((commentList, index)=>{return(
            <div style={{width:"100%", marginTop:"10px"}} onMouseOut={()=>setMouseOverIndex(null)} onMouseOver={()=>setMouseOverIndex(index)}>
            <>
            {selectedIndex == index &&
              <Grid container >
                <input value={selectedInputChange} onChange={(e)=>setSelectedInputChange(e.target.value)} />
                <button onClick={()=>onClickOnEditComment()}>edit comment</button>
                <button onClick={()=>setSelectedIndex(null)}>cancel</button>
              </Grid>
            }
            <Grid container key={index} onMouseOut={()=>setMouseOverIndex(null)} onMouseOver={()=>setMouseOverIndex(index)}>
              <span onMouseOut={()=>setMouseOverIndex(null)} onMouseOver={()=>setMouseOverIndex(index)}>{commentList.comment}</span>
            </Grid>
            {commentList?.repliedComment?.length > 0 &&
              commentList?.repliedComment?.map((repliedCommentSection, index)=>{
                  
                return(
                  <Grid container style={{marginLeft:'10px'}}>
                    <span>{repliedCommentSection.repliedComments}</span>
                  </Grid>
              )

              })
            }
            {selectedIndexForReply == index &&
              <Grid container onMouseOut={()=>setMouseOverIndex(null)} onMouseOver={()=>setMouseOverIndex(index)}>
                <input value={replyInput} onChange={(e)=>setReplyInput(e.target.value)} />
                <button onClick={()=>onClickOnReply()}>Reply</button>
                <button onClick={()=>setSelectedIndexForReply(null)}>cancel</button>
              </Grid>
            }
            {mouseOverIndex == index &&
            <Grid container onMouseOut={()=>setMouseOverIndex(null)} onMouseOver={()=>setMouseOverIndex(index)}>
              <Grid item onMouseOut={()=>setMouseOverIndex(null)} onMouseOver={()=>setMouseOverIndex(index)}>
                <span onClick={()=>onClickOnEditOrDeleteOrReply(index, 'edit', commentList.comment)} className='edit-delete-span'>Edit</span>
              </Grid>
              <Grid item onMouseOut={()=>setMouseOverIndex(null)} onMouseOver={()=>setMouseOverIndex(index)}>
                <span onClick={()=>onClickOnEditOrDeleteOrReply(index, 'delete')} className='edit-delete-span'>Delete</span>
              </Grid>
              <Grid item onMouseOut={()=>setMouseOverIndex(null)} onMouseOver={()=>setMouseOverIndex(index)}>
                <span onClick={()=>onClickOnEditOrDeleteOrReply(index, 'reply')} className='edit-delete-span'>Reply</span>
              </Grid>
            </Grid>
            }
            </>
            </div>
          )})
        }
        {<DeleteDialogComponent open={dialogOpen} onClickOnCancel={onClickOnCancel} onClickOnDelete={onClickOnDelete} />}
      </Grid>
    </div>
  )
}

export default CommentComponent