import Chip from '@mui/material/Chip';
interface statusType {
    status: string;
}
function Status({ status }: statusType) {
    let element = <Chip color='error' label="Open"/>
    if (status == "IN_PROGRESS")
        element = <Chip color='warning' label="In Progress"/>

    if (status == "closed")
        element = <Chip color='success' label="Closed"/>

    return element
}
export default Status