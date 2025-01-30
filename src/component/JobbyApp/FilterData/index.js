import { Component } from 'react'
import "./index.css"



export default class FilterData extends Component {
    
    


    render() {
     

        const { typeOfEmployments, salaryRange, onSalaryRange, onEmployment } = this.props


        const onClickSalaryRange = (id) => {
            onSalaryRange(id)

        }
        const onClickEmployment = (id) => {
            onEmployment(id)
            
        }


        return (
            <>
                <ul className='employment-or-range-container'>Type Of Employment
                    {
                        typeOfEmployments.map((each) => (
                            <li className='employment-or-range-list'>
                                <button onChange={() => (onClickEmployment(each.id))} className='employment-or-range-btn'>
                                    <input className='employment-or-range-input' value={each.id} id={each.id} type='checkbox' />

                                    <label className='employment-or-range-label' htmlFor={each.id}>{each.type}</label>
                                </button>
                            </li>

                        ))
                    }
                </ul>
                <hr className='horizontal-line' />
                <ul className='employment-or-range-container'>Salary Range
                    {
                        salaryRange.map((eachSalary) => (
                            <li className='employment-or-range-list'>
                                <button onClick={() => (onClickSalaryRange(eachSalary.id))} className='employment-or-range-btn'>
                                    <input className='employment-or-range-input' value={eachSalary.id} name="salary" id={eachSalary.id} type='radio' />
                                    <label className='employment-or-range-label' name="salary" htmlFor={eachSalary.id}>{eachSalary.range}</label>
                                </button>
                            </li>

                        ))
                    }
                </ul>
            </>
        )
    }
}
