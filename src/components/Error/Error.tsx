import { useAppSelector } from "app/hooks";
import './Error.scss';

export const Error = () => {
  const { error } = useAppSelector(state => state.contacts);

  return (
    <p className="alert alert-danger Error" role="alert">
      {error}
    </p>
  )
}