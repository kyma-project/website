---
title: Overview
---

The Kyma community collaborates through SIGs and WGs. They are platforms to meet other community members, exchange information on Kyma, provide feedback, raise interest, ask questions, and learn about the product. Additionally, SIGs and WGs facilitate technical discussions, proposals, and contributions, and ensure Kyma is a welcoming community for all contributors.

## SIG - Special Interest Group

Through SIGs, the Kyma community members collaborate and contribute to topics of long-term interest for Kyma and its community. SIGs can be either vertically focused on particular components and functions or be horizontal in form, cross-cutting, and can span multiple functional and technical domains.

## WG - Working Group

WGs facilitate discussions and work on short-lived, concrete topics that either result from the work of SIG groups or which the community members initiate directly.

## Collaborate and work together

While most of the work within one SIG or WG group does not require cooperation with other SIGs, there are efforts, such as larger feature development and refactoring, that cross a single SIG's boundaries. In this case, the members of involved SIGs collaborate and agree on solutions.

The cross-project activities can require a creation of a new WG to address them more specifically. Those overarching activities produce coordination overhead with regards to time and efforts.

## Kyma project organization

The Kyma project is open-source and is available on [GitHub](https://github.com/kyma-project). Although external contributions to the Kyma open-source project are welcome through the public GitHub project, the Kyma teams within the organization largely drive the Kyma development.

To ensure the continuous growth and the "scale-as-you-go-and-need" approach when extending the community, the current structure and governance bodies of Kyma SIGs and WGs are very simple. However, the structure of the community can change depending on the community needs. The SIG Community and the Kyma Council support the governance of Kyma and a single SIG Core represents it publicly. The aim of the SIG Core is to facilitate the collaboration with external contributors.

### The Kyma Council

The purpose of the Kyma Council is to:
* Drive the Kyma project strategy and vision
* Engage in the resolution of conflicts that cannot be solved by the SIG Community or within a given SIG or WG
* Publicly announce decisions or recommendations
* Agree to the new SIG or WG proposals or raise concerns about them

### List of SIGs

The list of public SIGs in Kyma includes:

* [Core](sig-core.md)

### List of WGs

There is no actively working WG right now.

### Closed SIGs and WGs

To see the list of closed SIGs and WGs, check the [archive](archive/).

## Organize new SIGs and WGs

To propose a new SIG or WG, go to the [issue tracker](https://github.com/kyma-project/community/issues) in the `community` repository and create a new issue from the **SIG or WG proposal** template. The template contains general information explaining the purpose, the goals of the group, and the criteria for the group assessment and evaluation. Provide the required details and submit the issue. If necessary, contact SIG Community leaders to verify it.

>**NOTE:** You must have at least five candidates for the new SIG or WG to submit the proposal.

The proposal revision process is as follows:
* The SIG Community discusses the SIG or the WG proposal with the authors and in parallel informs the Kyma Council of the proposal.
* All involved parties decide whether the topic requires a SIG or a WG collaboration or if you can address the topic by creating one or more issues in GitHub and pairing the sprints of several teams for several iterations.
* The SIG Community can suggest a public discussion of the proposal to make sure it meets the community needs and raises enough interest.
* The SIG Community can also suggest the revision of the SIG and the WG topics or object to a given group creation and provide the authors of the proposal with the reason for the objection. The SIG Community can also advise on other ways to address the topics suggested in the proposal.  
* When informed by the SIG Community, the Council agrees, during the weekly meeting, to the creation of the new SIG or WG, suggests the revision of the group's topics, or objects to the group creation stating the reason for the objection.

Once the SIG or the WG receives an approval for the group creation, the authors of the proposal arrange the appropriate communication channels. The process is as follows:
 * Create a new folder in this directory following the `[sig|wg]-{shortname}` naming pattern.
 * Use the [template](https://github.com/kyma-project/community/blob/master/guidelines/templates/resources/sig-wg-readme-template.md) to create a given group's main `README.md` document.
 * Add a new [label](https://github.com/kyma-project/community/labels) that follows the `[sig|wg]-{shortname}` naming pattern.
 * Use the [template](https://github.com/kyma-project/community/blob/master/guidelines/templates/resources/sig-wg-meeting-notes-template.md) to create a `meeting-notes.md` document in a given group's folder.
 * Create a Slack channel that follows the `[sig|wg]-{shortname}` naming pattern.
 * Create a new team in the GitHub organization that follows the `[sig|wg]-{shortname}` naming pattern. Add all SIG participants as members of this team.

>**NOTE:** Use the dedicated Slack channel for online video meetings. If Slack fails to scale due to a large number of participants, choose a different tool that is accessible to all of them.

To standardize the Special Interest Group and Working Group efforts, create maximum transparency and route contributors to the appropriate group.

## General guidelines

All Kyma SIG and WG members agree to these rules:
* Follow the Kyma [Manifesto](https://kyma-project.github.io/community/).
* Follow the official project guidelines defined in the [`community`](https://github.com/kyma-project/community/blob/master/README.md) repository.
* Meet regularly in the agreed frequency, for at least 30 minutes.
* Keep up-to-date meeting notes in a given SIG's folder.
* Maintain related repositories and ensure smooth processing of pull requests.
* Announce the meeting agenda and notes after each meeting.
* Maintain the Slack channel and respond promptly to questions.
* Participate in the SIG's plannings and retrospectives.
* Contribute the related work to a project-owned GitHub repository with code and tests that the SIG explicitly owns and supports. This includes issue prioritization, pull request reviews, test-failure responses, and bug fixes.
* Use the above forums instead of private emails and meetings as the primary means of working, communicating, and collaborating.

## Roles

When you join a SIG or a WG, you perform at least one of the following roles:
* **Group member** - The member is active in one or more areas of the project and can perform a wide variety of roles within the organization.
* **Group leader** - SIGs and WGs must nominate at least two group leaders at any given time. Group leaders make sure that the group topics are relevant to Kyma and the group topics. They facilitate the group meetings, maintain, and communicate the meeting minutes. Group leaders record tasks identified by the group as issues in the respective issue tracker. They are responsible for smooth communication and coordination with other SIGs, the Council, and the SIG Community.
* **Group representative** - It is a specific group member who represents the group to other groups or the Council. This is either the group's leader or any other group member. The choice depends on the topic and the place where the group is represented.

## Close a SIG or WG
When a SIG or WG has completed its goals or there is an explicit request to conclude further work, it has to be closed. The request to close a SIG or WG may come from group members, group leaders, Kyma community or Kyma Council. To close a SIG or WG, group leaders need to:

* Create an issue and accompanying pull request (PR) to close a SIG or WG and add the **decision** label to them.
* Close the remaining open issues of the group or reassign them accordingly, with appropriate comment.
* [Delete the group label](https://help.github.com/en/articles/deleting-a-label) used on the issues or PRs.
* Remove the group from the [List of SIGs](#list-of-sigs) or [List of WGs](#list-of-wgs) in this `README.md` file. 
* Move the group folder (together with all subfolders and files) to the [archive](archive) folder.
* Add a `CLOSURE.md` file to the archived group folder. Write it in a form of a blog post which informs about the group's outcomes, achievements, challenges, and lessons learned. Remember to provide links to the relevant material. The PR undergoes standard review by group members, Kyma Council and is subsequently closed. 
* Publish the content of the `CLOSURE.md` in a form of a blog post on the Kyma website or link to it. 
* Communicate the closure of a given SIG or WG through the SIG Core.
