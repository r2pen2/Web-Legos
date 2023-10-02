import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { WLLayoutHeader, WLLayoutText } from "../../../components/Text";
import { BannerCentered } from "../../../Layouts/Sections/Banner";

describe("FooterCentered tests", () => {

  const TestBanner = (props) => (
    <BannerCentered>
      <BannerCentered.Header>
        <WLLayoutHeader editable>Test Header</WLLayoutHeader>
      </BannerCentered.Header>
      <BannerCentered.Body>
        <WLLayoutText editable>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias vero accusantium ea nulla nisi unde sunt quasi rem. Quas at, distinctio deserunt voluptatum totam enim! Laudantium nulla natus tempore necessitatibus.
        </WLLayoutText>
      </BannerCentered.Body>
    </BannerCentered>
  )

  test("BannerCentered renders", () => {
    render(<TestBanner />)
    const banner = screen.getByTestId("wl-banner-centered");
    expect(banner).toBeVisible();
  })
  
  test("BannerCentered renders header", () => {
    render(<TestBanner />)
    const header = screen.getByTestId("wl-banner-centered-header");
    expect(header).toBeVisible();
  })
  
  test("BannerCentered renders body", () => {
    render(<TestBanner />)
    const body = screen.getByTestId("wl-banner-centered-body");
    expect(body).toBeVisible();
  })
})