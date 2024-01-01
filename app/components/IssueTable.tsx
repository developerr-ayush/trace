import { Table } from '@radix-ui/themes'
async function allIssues() {
  const res = await fetch("http://localhost:3000/api/issues")
  return res.json()
}
export const IssueTable = async () => {
  const issue = await allIssues()
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue Number</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Issue Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issue.map((iss: any) => {
          return <Table.Row key={iss.id}>
            <Table.RowHeaderCell>{iss.title}</Table.RowHeaderCell>
            <Table.Cell>{iss.description}</Table.Cell>
            <Table.Cell>{iss.status}</Table.Cell>
            <Table.Cell>{iss.updatedAt}</Table.Cell>
          </Table.Row>
        })}
      </Table.Body>
    </Table.Root>
  )
}
