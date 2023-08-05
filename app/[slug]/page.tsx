"use client";
import { usePathname } from "next/navigation";
import {
  Card,
  Link,
  Image,
  CardFooter,
  CardBody,
  Divider,
  CardHeader,
} from "@nextui-org/react";
import { Organizations, urlDTO } from "../types/index";
import {
  LinkedinOutlined,
  MailOutlined,
  GithubOutlined,
  GlobalOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { organizationsStore } from "../organizations";
import { Organizer } from "../types/Organizer";

const organizations: Organizations = organizationsStore;

export default function Group() {
  const group: string = usePathname().slice(1);

  return (
    <div className="flex justify-center items-center flex-col pt-4">
      <Card className="m-5 lg:w-[768px] md:w-[768px] sm:w-full">
        <CardHeader className="font-bold">
          {group.replace(/-/g, " ")}
        </CardHeader>
        <Divider />
        <CardBody>{organizations[group]?.about}</CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            isBlock
            showAnchorIcon
            color="secondary"
            size="sm"
            href={ organizations[group]?.org_url }
            target="_blank"
          >
            {organizations[group]?.org_url}
          </Link>
        </CardFooter>
      </Card>
      <Card className="m-5 lg:w-[768px] md:w-[768px] sm:w-full">
        <CardHeader className="font-bold">Organizers</CardHeader>
        <Divider />
        <div className="flex justify-evenly self-center flex-col sm:w-full sm:flex-row flex-wrap">
          {organizations[group]?.organizers.map((e: Organizer, i: number) => (
            <Card
              isFooterBlurred={ true }
              shadow="md"
              className="m-5 min-w-fit w-[250px] h-[250px]"
              key={ `${e}${i}` }
            >
              <CardBody className="p-0 overflow-hidden">
                <Image
                  shadow="none"
                  className="object-cover"
                  src={ e.pfp }
                  width="250px"
                  height="250px"
                  alt="organizer profile picture"
                />
              </CardBody>
              <CardFooter className="absolute bg-white/30 bottom-0 items-center border-t-1 border-zinc-100/50 z-10 justify-between">
                <p>{e.name}</p>
                <div className="flex items-center self-center gap-2">
                  {e.links?.map((e: urlDTO, i: number) => {
                    const linked = Object.keys(e)[0];
                    let icon;
                    switch (linked) {
                      case "linkedin":
                        icon = (
                          <a
                            href={ Object.values(e)[0] }
                            target="_blank"
                            key={ Object.values(e)[0] + i } rel="noreferrer"
                          >
                            <LinkedinOutlined />
                          </a>
                        );
                        break;
                      case "github":
                        icon = (
                          <a
                            href={ Object.values(e)[0] }
                            target="_blank"
                            key={ Object.values(e)[0] + i } rel="noreferrer"
                          >
                            <GithubOutlined />
                          </a>
                        );
                        break;
                      case "email":
                        icon = (
                          <a
                            href={ `mailto:${Object.values(e)[0]}` }
                            target="_blank"
                            key={ Object.values(e)[0] + i } rel="noreferrer"
                          >
                            <MailOutlined />
                          </a>
                        );
                        break;
                      case "portfolio":
                        icon = (
                          <a
                            href={ Object.values(e)[0] }
                            target="_blank"
                            key={ Object.values(e)[0] + i } rel="noreferrer"
                          >
                            <GlobalOutlined />
                          </a>
                        );
                        break;
                      default:
                        icon = (
                          <a
                            href={ Object.values(e)[0] }
                            target="_blank"
                            key={ Object.values(e)[0] + i } rel="noreferrer"
                          >
                            <LinkOutlined />
                          </a>
                        );
                        break;
                    }
                    return icon;
                  })}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
