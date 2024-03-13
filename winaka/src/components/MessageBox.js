import Alert from "react-bootstrap/Alert";

export default function MessageBox(props) {
    return (
      <Alert animation={props.variant || 'info'}> {props.children} </Alert>
    );
}