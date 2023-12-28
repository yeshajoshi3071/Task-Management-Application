import { CircularProgress } from "@mui/material"

/**
 * Renders a loading spinner component.
 * @returns JSX.Element
 */
function Loading() {
  return (
    <div className="flex h-screen"><CircularProgress className="mx-auto self-center"/></div>
  )
}

export default Loading