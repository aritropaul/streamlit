/**
 * @license
 * Copyright 2018-2019 Streamlit Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/// <reference types="cypress" />

describe("st.text_area", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("shows widget correctly", () => {
    cy.get(".stTextArea").should("have.length", 4);

    cy.get(".stTextArea").each((el, idx) => {
      cy.wrap(el).matchImageSnapshot("text_area" + idx);
    });
  });

  it("has correct default values", () => {
    cy.get(".stText").should(
      "have.text",
      'value 1: "  "' +
        'value 2: " default text "' +
        'value 3: " 1234 "' +
        'value 4: " None "'
    );
  });

  it("sets value correctly when user types", () => {
    cy.get(".stTextArea textarea")
      .first()
      .type("test area{enter}");

    cy.get(".stText").should(
      "have.text",
      'value 1: "  "' +
        'value 2: " default text "' +
        'value 3: " 1234 "' +
        'value 4: " None "'
    );
  });

  it("sets value correctly on ctrl-enter keypress", () => {
    cy.get(".stTextArea textarea")
      .first()
      .type("test area{ctrl}{enter}");

    cy.get(".stText").should(
      "have.text",
      'value 1: " test area "' +
        'value 2: " default text "' +
        'value 3: " 1234 "' +
        'value 4: " None "'
    );
  });

  it("sets value correctly on command-enter keypress", () => {
    cy.get(".stTextArea textarea")
      .first()
      .type("test area{command}{enter}");

    cy.get(".stText").should(
      "have.text",
      'value 1: " test area "' +
        'value 2: " default text "' +
        'value 3: " 1234 "' +
        'value 4: " None "'
    );
  });

  it("sets value correctly on blur", () => {
    cy.get(".stTextArea textarea")
      .first()
      .type("test area")
      .blur();

    cy.get(".stText").should(
      "have.text",
      'value 1: " test area "' +
        'value 2: " default text "' +
        'value 3: " 1234 "' +
        'value 4: " None "'
    );
  });
});
