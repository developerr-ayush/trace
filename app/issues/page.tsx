"use client"
import { Table } from '@radix-ui/themes'
import axios from 'axios'
async function getIssues() {
  try {
    let allIssues = await axios.get("/api/issues");
    return allIssues
  } catch (err) {
    console.log("something went wrong")
  }
}
const page = async () => {
  return (
    <div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue Number</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Issue Title</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  )
}
export default page