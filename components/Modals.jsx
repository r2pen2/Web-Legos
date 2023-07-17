import { Modal, Text, Button, Card } from "@nextui-org/react";
import { Component} from "react";
import LaunchIcon from '@mui/icons-material/Launch';

/**
 * @param {boolean} open - whether modal is open
 * @param {Function} setOpen - set whether modal is open
 * @param {boolean} buttonBordered - whether to display bordered close button instead of flat
 */
export class CardModal extends Component {

  static Item({title, subtitle, href, icon}) {
    return (
      <div className="mt-2">
        <Card 
          isHoverable 
          isPressable
          variant="bordered" 
          onPress={() => window.open(href, "_blank")}
          css={{
            flex: 1,
          }}
        >
          <Card.Body>
            <div className="d-flex flex-row align-items-center justify-content-space-between">
              {icon}
              <div className="d-flex flex-column align-items-start justify-content-center w-100">
                <Text b>
                  {title}
                </Text>
                {subtitle}
              </div>
              <LaunchIcon />
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }

  render() {
    return (
      <Modal
        closeButton
        className="mx-2"
        open={this.props.open}
        blur
        onClose={() => this.props.setOpen(false)}
      >
        <Modal.Header>
          <Text h3 size="$md" id="modal-title">
            Select a service to open the form in a new tab.
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column">
            {this.props.children}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex flex-row align-items-center justify-content-center w-100">
            <Button auto flat={!this.props.buttonBordered} bordered={this.props.buttonBordered} color="error" onPress={() => this.props.setOpen(false)} >
                Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}