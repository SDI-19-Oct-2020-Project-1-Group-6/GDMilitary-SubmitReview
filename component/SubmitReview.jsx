import React from 'react'
import ReactStars from 'react-rating-stars-component'

class SubmitReview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            rating: 0,
            reviewText: "",
            pros: "",
            cons: ""
        }
    }

    handleStars = (newRating) => {
        this.setState({rating: newRating})
    }

    handleSubmit = () => {
        if (this.name !== "" && this.rating !== 0 && this.reviewText !== "" && this.pros !== "" && this.cons !== "" ) {
            const response = this.posting(this.name, this.rating, this.reviewText, this.pros, this.cons)

            response.then(console.log('i waited'))
        } 
    }

    posting = async (name, rating, reviewText, pros, cons) => {
        console.log(name)
        const body = {
            person_id : 1,
            rating : rating,
            reviewText : reviewText,
            pros : pros,
            cons : cons
        }
        
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        
        try {
            const fetchResponse = await fetch (`http://localhost:3001/submit`, settings)
            const data = await fetchResponse.json()
            return data
        } catch (error) {
            console.log(error)
        }
        
    }

    handleReviewText = (e) => {
        const text  = e.target.value
        console.log(text)
        this.setState({reviewText: text})
    }

    
    handlePros = (e) => {
        const text  = e.target.value
        this.setState({pros: text})
    }

    
    handleCons = (e) => {
        const text  = e.target.value
        this.setState({cons: text})
    }

    render() {
        return(
            <div>
                

                <ReactStars onChange={this.handleStars}/>
                <span>Review: </span>
                <textarea id="reviewText" name="reviewText" rows="2" cols="40" onChange={this.handleReviewText}/>
                <span>Pros: </span>
                <textarea id="pros" name="pros" rows="2" cols="40" onChange={this.handlePros}/>
                <span>Cons:</span>
                <textarea id="cons" name="cons" rows="2" cols="40" onChange={this.handleCons}/>

                <button onClick={this.handleSubmit}> Submit Review </button>
            </div>
        );
    }
}




export default SubmitReview;