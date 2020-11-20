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

    handleSubmit = async () => {
        if (this.state.name !== "" && this.state.rating !== 0 && this.state.reviewText !== "" && this.state.pros !== "" && this.state.cons !== "" ) {

            let name = this.state.name

            await this.idLookup(name).then( async (id) => {
                if (id === -1) {
                    await this.addPerson(name)
                    let newId = await this.idLookup(name)
                    console.log(newId)
                    if (newId === -1) { PromiseRejectionEvent() }
                    return newId
                }
            }).then(id => {
                this.posting(id, this.state.rating, this.state.reviewText, this.state.pros, this.state.cons)
            }).catch(error=>console.log("failed to add user"))
            
         
        } 
    }



    addPerson = async (name) => {
        const body = {name: name}
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        try {
            const fetchResponse = await fetch (`http://localhost:3000/addUser`, settings)
            const data = await fetchResponse.json()
            Promise.resolve(data) 
        } catch (error) {
            console.log(error)
        }
    }

    idLookup = async (name) => {
        try {
            const fetchResponse = await fetch (`http://localhost:3000/idLookup?name=${name}`)
            const data = await fetchResponse.json()
            return data
        } catch (error) {
            console.log(error)
        }

    }

    posting = async (id, rating, reviewText, pros, cons) => {
        const body = {
            person_id : id,
            reviewStars : rating,
            reviewText : reviewText,
            pros : pros,
            cons : cons,
            unit_id : "134"
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
            const fetchResponse = await fetch (`http://localhost:3000/submit`, settings)
            console.log(fetchResponse)
            const data = await fetchResponse.json()
            return data
        } catch (error) {
            console.log(error)
        }
        
    }


    handleName = (e) => {
        const text = e.target.value
        this.setState({name: text})
    }

    handleReviewText = (e) => {
        const text  = e.target.value
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
        return (
            <div className="SubmitReview">

            <div className="ui fluid card">
              <div className="content">
                <div className="header">My Review:</div>
              </div>
              <div className="content">
                <h4 className="ui sub header">
                  <ReactStars onChange={this.handleStars} />
                </h4>
                <div className="ui small feed">
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                        <div className="ui labeled input">
                          <div className="ui label">Name:</div>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={this.handleName}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                        <div className="ui labeled input">
                          <div className="ui label">Review:</div>
                          <textarea
                            id="reviewText"
                            name="reviewText"
                            rows="2"
                            cols="38"
                            onChange={this.handleReviewText}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                        <div className="ui labeled input">
                          <div className="ui label">Pros:</div>
                          <textarea
                            id="pros"
                            name="pros"
                            rows="2"
                            cols="40"
                            onChange={this.handlePros}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                        <div className="ui labeled input">
                            <div className="ui label">Cons:</div>
                            <textarea
                                id="cons"
                                name="cons"
                                rows="2"
                                cols="40"
                                onChange={this.handleCons}
                            />
                        </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div className="extra content">
                <button onClick={this.handleSubmit} className="ui button">
                  {" "}
                  Submit Review{" "}
                </button>
              </div>
            </div>
          </div>
        );
    }
}




export default SubmitReview;