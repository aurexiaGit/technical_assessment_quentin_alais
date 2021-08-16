import React, { Component } from 'react'
import { Card,Container,Row,Col,Button ,InputGroup,FormControl,Table} from 'react-bootstrap';
import randomFloat from 'random-float';


export default class App extends Component {
  constructor()
  {
    super();
    this.state={
      fx_rate:1.1,
      input_value:1,
      currency_name_a:"EUR - Euro",
      currency_name_b:"USD - Dollar",
      currency_a_symbol:"€",
      currency_b_symbol:"$",
      output_value:0,
      historicaldata:[]
    }

    this.handleChangeInput=this.handleChangeInput.bind(this)
    this.convert=this.convert.bind(this)
    this.switch=this.switch.bind(this)
  


  }

  switch(event){
    this.setState({
      currency_name_a:this.state.currency_name_b,
      currency_name_b:this.state.currency_name_a,
      currency_a_symbol:this.state.currency_b_symbol,
      currency_b_symbol:this.state.currency_a_symbol,
      fx_rate:Math.abs(1/this.state.fx_rate)
    })
  }

  handleChangeInput(event) {
    this.setState({input_value: event.target.value});
  }

  convert(event){
    this.setState({output_value:(this.state.fx_rate*this.state.input_value).toFixed(4)},this.handleAddSubmit())
    
  }

 

  handleAddSubmit(){
    const obj = {fx_rate :this.state.fx_rate,amount:(this.state.fx_rate*this.state.input_value).toFixed(4),source_currency:this.state.currency_name_a,target_currency:this.state.currency_name_b};
    const historicaldata = [...this.state.historicaldata]
    historicaldata.push(obj);
    this.setState({
      historicaldata
    })
  }

  



  componentDidMount(){
    setInterval(()=>this.setState({fx_rate:this.state.fx_rate+Number(randomFloat(-0.05,0.05).toFixed(4)),
    }),3000)
  }
 
  render() {
    console.log(this.state.historicaldata)
    return (
      <div>


        <div >
          <br></br>
          <h2 style={{textAlign:'center'}}>EUR/USD Converter</h2>
          <div style={{paddingTop:'45px'}}>


            <Container fluid="md">
            <Row>
              <Col>Amount </Col>
              <Col></Col>
              <Col> FX - Rate   </Col>
            </Row>

            <Row>
              <Col>
                <Card style={{height:'100%'}}>
                    <InputGroup style={{height:'100%'}}> 
                      <FormControl 
                        placeholder=""
                        type="text" value={this.state.input_value} onChange={this.handleChangeInput}
                      />
                      <InputGroup.Text id="basic-addon1"> {this.state.currency_a_symbol} </InputGroup.Text>
                    </InputGroup>
                </Card>
              </Col>

              <Col>
                <Card>
                  <Card.Body> <Row>
                  <Col> From: {this.state.currency_name_a}  </Col>
                  <Col> To: {this.state.currency_name_b} </Col>
                </Row> </Card.Body>
                </Card>
              </Col>

              <Col>
                <Card>
                  <Card.Body>{this.state.fx_rate.toFixed(4)}</Card.Body>
                </Card>
              </Col>
            </Row>

            <br/>

            <Row>
              <Col>Output </Col>
              <Col> </Col>
              <Col> </Col>
            </Row>

            <Row>
              <Col>
               <Card style={{height:'100%'}}>
                 { this.state.output_value} {this.state.currency_b_symbol}
               </Card>
              </Col>

              <Col>  
                <Button style={{width:'100%'}}  onClick={this.convert}>Convert</Button>
              </Col>

              <Col>
                <Card>
                <Button onClick={this.switch} variant="outline-secondary">Switch</Button>
                </Card>
              </Col>
            </Row>

            <br/>

            <h4 style={{textAlign:'center'}}>Historical Conversions</h4>

            <Row>
               <Col>
                <Card>
                <Table style={{width:'100%'}}striped bordered hover>
                    <thead>
                      <tr>
                        
                        <th>FX Rate</th>
                        <th>Amount</th>
                        <th>Currency Source</th>
                        <th>Currency Target</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        this.state.historicaldata.map(item=>{
                        return (
                        <tr>
                        <td>{item.fx_rate.toFixed(4)}</td>
                        <td>{item.amount}</td>
                        <td>{item.source_currency}</td>
                        <td>{item.target_currency}</td>
                        </tr>)

                        })
                      }
                      
                      
                    </tbody>
              </Table>
                </Card>
               
               </Col>


            </Row>

          

          </Container>
          </div>
        </div>   
      </div>
    )
  }
}

