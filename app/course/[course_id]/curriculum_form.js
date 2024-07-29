"use client";

import React from "react";
import { emitter } from "@/app/layout";
import { post_request } from "@/src/utils/services";

class Curriculum_form extends React.Component {
  constructor(props) {
    super(props);

    let { slide } = this.props;

    this.state = {
      subtopics: new Array(),
      subtopic_index: null,
      ...slide,
      subtopic_in_edit: { text: "" },
    };
  }

  add_subtopic = (e) => {
    e.preventDefault();
    let { subtopic_in_edit, subtopic_index, subtopics } = this.state;

    if (subtopic_index !== null) {
      subtopics[subtopic_index] = subtopic_in_edit;
      subtopic_index = null;
    } else subtopics = new Array(...subtopics, subtopic_in_edit);

    this.setState({
      subtopics,
      subtopic_index,
      subtopic_in_edit: new Object({ text: "" }),
    });
  };

  edit_subtopic = (index) => {
    let subtopic_in_edit = this.state.subtopics[index];
    this.setState({ subtopic_in_edit, subtopic_index: index });
  };

  filter_subtopic_index = (index) => {
    let { subtopics } = this.state;
    subtopics.splice(index, 1);
    this.setState({ subtopics });
  };

  submit = async () => {
    let { course, toggle } = this.props;
    let { topic, subtopics, _id } = this.state;

    let slide = {
      topic,
      subtopics,
      _id,
      course,
    };

    let response = await post_request(
      _id ? "update_slide" : "add_slide",
      slide
    );
    slide._id = response._id;
    slide.created = response.created;

    emitter.emit(_id ? "slide_update" : "new_slide", slide);

    this.reset_state();
  };

  reset_state = () =>
    this.setState({
      topic: "",
      subtopics: new Array(),
      _id: null,
    });

  render() {
    let { toggle } = this.props;
    let { topic, _id, subtopics, subtopic_in_edit, subtopic_index } =
      this.state;

    return (
      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Slide</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={toggle}
              >
                <span aria-hidden="true">
                  <i className="fas fa-times-circle"></i>
                </span>
              </button>
            </div>
            <br />
            <div className="modal-body">
              <form className="forms_block">
                <div className="form-group smalls">
                  <label>Topic*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={({ target }) =>
                      this.setState({ topic: target.value })
                    }
                    value={topic}
                  />
                </div>

                <div className="form-group smalls">
                  <label>Sub Topics</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add subtopic"
                    value={subtopic_in_edit.text}
                    onChange={({ target }) =>
                      this.setState({
                        subtopic_in_edit: {
                          ...subtopic_in_edit,
                          text: target.value,
                        },
                      })
                    }
                  />
                  {subtopic_in_edit ? (
                    <a
                      onClick={this.add_subtopic}
                      href="#"
                      class="btn theme-bg text-light mt-2"
                    >
                      {subtopic_index === null ? "Add" : "Update"}
                    </a>
                  ) : null}
                </div>
                {subtopics.length ? (
                  <ul class="simple-list p-0">
                    {subtopics.map((subtopic, i) => (
                      <li key={i}>
                        {subtopic.text}{" "}
                        <span
                          className="px-2"
                          onClick={() => this.filter_subtopic_index(i)}
                        >
                          <i className={`fa fa-trash`}></i>
                        </span>
                        <span
                          className="px-2"
                          onClick={() => this.edit_subtopic(i)}
                        >
                          <i className={`fa fa-edit`}></i>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {topic && subtopics.length ? (
                  <div className="form-group smalls">
                    <button
                      onClick={this.submit}
                      type="button"
                      className={`btn full-width ${"theme-bg"} text-white`}
                    >
                      {_id ? "Update Slide" : "Add Slide"}
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Curriculum_form;
