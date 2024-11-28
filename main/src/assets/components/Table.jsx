
import { useState } from "react";


const Table = () =>{
    const [content,setContent] = useState([])
    return (
        <div className="Table">

        <table>
            <thead>
                <tr>


    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
                </tr>
            </thead>
            <tbody>


  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
            </tbody>
</table>
        </div>
    )
}

export default Table