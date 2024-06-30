import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { vi, afterEach, describe, it, expect } from "vitest";
import Publication from "./Publication";

const handleDelete = () => {
  console.log("Deleting Post");
};

const publication = {
  author: "Author String",
  createdAt: new Date(),
  objectID: 1,
  softDeleted: false,
  story_title: "Story Title String",
  story_url: "Story Url String",
  _id: "ID String",
};

describe("Publication test", () => {
  afterEach(cleanup);

  it("should render component", () => {
    render(
      <Publication publication={publication} handleDelete={handleDelete} />
    );
  });

  it("should render title", () => {
    render(
      <Publication publication={publication} handleDelete={handleDelete} />
    );
    screen.getByText(publication.author);
  });

  it("should fire handle delete function", () => {
    const logSpy = vi.spyOn(console, "log");

    render(
      <Publication publication={publication} handleDelete={handleDelete} />
    );

    const deleteBtn = screen.getByText("Delete");
    fireEvent.click(deleteBtn);

    expect(logSpy).toHaveBeenCalledWith("Deleting Post");
  });
});
