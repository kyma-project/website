import React from "react";
import styled from "styled-components";
import { Separator } from "@kyma-project/react-components";
import { DOCS_RESPONSIVE_BREAKPOINT } from "../../../../../constans/docs";

const Wrapper = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 94px);

  @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
    max-height: calc(100vh - 140px);
  }
`;

const NavigationContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 0;
  text-align: left;
`;

const NavigationHeader = styled.div`
  font-size: 12px;
  font-weight: 300;
  text-align: left;
  color: rgba(63, 80, 96, 0.6);
  padding: 10px 0;
  text-transform: uppercase;
`;

const Items = styled.ul`
  width: auto;
  margin: 0;
  margin-top: ${props => (props.marginTop ? "10px" : "0")};
  margin-bottom: ${props => (props.marginTop ? "-10px" : "0")};
  margin-left: ${props => (props.secondary ? "10px" : "0")};
  padding: 0;
  max-height: ${props =>
    (props.show && "9000px") || (props.showAll && "auto") || "0"};
  overflow-y: ${props => (props.show ? "auto" : "hidden")};
  transition: max-height ease-in-out 0.7s;
`;

const ACTIVE_COLOR = "#167ee6";
const Item = styled.li`
  display: block;
  padding: 10px 0;
`;

const LinkWrapper = styled.div`
  position: relative;
`;
const Arrow = styled.a`
  width: 16px;
  height: 100%;
  display: block;
  position: absolute;
  z-index: 50;
  cursor: pointer;
  :before {
    content: "";
    display: "block";
    width: 0;
    height: 0;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-left: ${props =>
      props.active
        ? `3px solid ${ACTIVE_COLOR}`
        : "3px solid rgba(50,54,58,0.6)"};
    left: 2px;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    transform: ${props =>
      props.activeArrow
        ? "translateY(-50%) rotate(90deg)"
        : "translateY(-50%)"};
  }
`;
const Link = styled.a`
  color: ${props => (props.active ? ACTIVE_COLOR : "#485766")};
  font-size: 14px;
  font-weight: ${props => (props.bold ? "bold" : "normal")};
  display: block;
  padding-left: 16px;
  position: relative;
  :hover {
    color: ${ACTIVE_COLOR};
    cursor: pointer;
  }
`;

function SecondarySubLink(props) {
  const { rootId, parentId, type, items, active, activeNav } = props;
  let onClick = (clickedItem, options) => {
    props.callbackParent(clickedItem, options);
  };
  let setActiveNav = clickedItem => {
    props.setActiveNav(clickedItem);
  };
  const isActiveNav = parentId
    ? activeNav.id === rootId &&
      activeNav.hash &&
      activeNav.hash.indexOf(parentId) !== -1
    : activeNav.id === rootId;

  return (
    <Items secondary marginTop show={isActiveNav}>
      {items &&
        items.map((item, index) => {
          let hash, isActive, topicType;
          if (parentId) {
            hash = `${parentId}-${item.anchor}`;
            isActive =
              active.hash &&
              active.id === rootId &&
              active.hash === `${parentId}-${item.anchor}`;
          } else {
            topicType = item.topicType
              ? item.topicType.replace(/ /g, "-").toLowerCase()
              : item.anchor;
            hash = `${topicType}-${item.anchor}`;
            isActive =
              active.hash && active.id === rootId && active.hash === hash;
          }

          const hasSubElements = item && item.titles && item.titles.length > 0;
          const isActiveNavArrow =
            hasSubElements &&
            activeNav.id === rootId &&
            activeNav.hash &&
            activeNav.hash.indexOf(item.anchor) !== -1;
          return (
            <Item
              key={
                parentId
                  ? `${rootId}-${parentId}-${item.anchor}`
                  : `${rootId}-${item.anchor}`
              }
            >
              <LinkWrapper>
                {hasSubElements && (
                  <Arrow
                    onClick={() => {
                      setActiveNav({
                        id: rootId,
                        type: type,
                        hash: hash,
                      });
                    }}
                    active={isActive}
                    activeArrow={isActiveNavArrow}
                  />
                )}
                <Link
                  active={isActive}
                  onClick={() => {
                    onClick(
                      {
                        id: rootId,
                        type: type,
                        hash: hash,
                      },
                      { hasSubElements },
                    );
                  }}
                >
                  {item.name}
                </Link>
              </LinkWrapper>
              {hasSubElements && (
                <SecondarySubLink
                  items={item.titles}
                  type={type}
                  rootId={rootId}
                  parentId={item.anchor}
                  history={props.history}
                  active={active}
                  activeNav={activeNav}
                  callbackParent={props.callbackParent}
                />
              )}
            </Item>
          );
        })}
    </Items>
  );
}

function NavigationList(props) {
  let onClick = (clickedItem, options) => {
    props.callbackParent(clickedItem, options);
  };
  let setActiveNav = clickedItem => {
    props.setActiveNav(clickedItem);
  };
  return (
    <Wrapper>
      <NavigationContainer>
        <Items showAll>
          <Item key={props.items.root.id}>
            <LinkWrapper>
              {props.topics && (
                <Arrow
                  onClick={() => {
                    setActiveNav({
                      id: props.items.root.id,
                      type: "root",
                      hash: "",
                    });
                  }}
                  activeArrow={props.items.root.id === props.activeNav.id}
                  active={
                    !props.active.hash &&
                    props.active.id === props.items.root.id
                  }
                />
              )}
              <Link
                active={
                  !props.active.hash && props.active.id === props.items.root.id
                }
                onClick={() => {
                  onClick(
                    {
                      id: props.items.root.id,
                      type: "root",
                      hash: "",
                    },
                    { hasSubElements: props.topics && props.topics.length > 0 },
                  );
                }}
              >
                {props.items.root.displayName}
              </Link>
            </LinkWrapper>
            {props.topics && (
              <SecondarySubLink
                items={
                  props.topics.find(obj => obj.id === props.items.root.id)
                    .sections
                }
                type="root"
                rootId={props.items.root.id}
                active={props.active}
                activeNav={props.activeNav}
                history={props.history}
                callbackParent={props.callbackParent}
                setActiveNav={props.setActiveNav}
              />
            )}
          </Item>
        </Items>
      </NavigationContainer>
      <Separator />
      <NavigationContainer>
        <NavigationHeader>Components</NavigationHeader>
        <Items showAll>
          {props.items.components.map(item => {
            let topics = null;
            if (props.topics) {
              topics = props.topics.find(obj => obj.id === item.id);
            }
            return (
              <Item key={item.id}>
                <LinkWrapper>
                  {topics &&
                    topics.sections && (
                      <Arrow
                        onClick={() => {
                          setActiveNav({
                            id: item.id,
                            type: "components",
                            hash: "",
                          });
                        }}
                        activeArrow={item.id === props.activeNav.id}
                        active={
                          !props.active.hash && props.active.id === item.id
                        }
                      />
                    )}
                  <Link
                    active={!props.active.hash && props.active.id === item.id}
                    onClick={() =>
                      onClick(
                        {
                          id: item.id,
                          type: "components",
                          hash: "",
                        },
                        {
                          hasSubElements:
                            topics &&
                            topics.sections &&
                            topics.sections.length > 0,
                        },
                      )}
                  >
                    {item.displayName}
                  </Link>
                </LinkWrapper>
                {topics &&
                  topics.sections && (
                    <SecondarySubLink
                      items={topics.sections}
                      type="components"
                      rootId={item.id}
                      active={props.active}
                      activeNav={props.activeNav}
                      history={props.history}
                      callbackParent={props.callbackParent}
                      setActiveNav={props.setActiveNav}
                    />
                  )}
              </Item>
            );
          })}
        </Items>
      </NavigationContainer>
    </Wrapper>
  );
}

export default NavigationList;
