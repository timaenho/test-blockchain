import * as React from "react";
function purse() {
  return (
    <React.Fragment>
      <div className="balance-view is-size-2 my-4">
        Your Balance is <strong>10</strong> ETH
      </div>
      <button className="button is-primary is-light mr-2">Add to Purse</button>
      <button className="button is-link is-light">Withdraw</button>
    </React.Fragment>
  );
}
export default purse;