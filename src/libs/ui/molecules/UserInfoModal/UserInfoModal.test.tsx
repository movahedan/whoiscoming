import { render } from "@testing-library/react";

import { UserInfoModal } from "./UserInfoModal";

describe("UserInfoModal", () => {
  it("should render correctly", () => {
    const { container } = render(<UserInfoModal dataTestId={"user"} />);
    expect(container).toMatchSnapshot();
  });
});
