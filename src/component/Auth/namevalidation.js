 export function nameValidation(event) {
        this.setState({nameRequired : false})                                         
        this.setState({nameError: false})
      
        this.setState({name: event.target.value}), () => {
          if (this.state.name === '' ){
            this.setState({nameRequired:true}), () =>  console.log (this.state)
          } else if(!/^[a-zA-Z ]*$/.test(this.state.name)){
            this.setState({nameError : true})
          }
        }
      }

export function emailValidation(event) {
        this.setState({emailRequired : false})                                         
        this.setState({emailError: false})
      
        this.setState({email: event.target.value}), () => {
          if (this.state.email === '' ){
            this.setState({nRequired:true}), () =>  console.log (this.state)
          } else if(!/^[a-zA-Z ]*$/.test(this.state.name)){
            this.setState({nameError : true})
          }
        }
      }



        


