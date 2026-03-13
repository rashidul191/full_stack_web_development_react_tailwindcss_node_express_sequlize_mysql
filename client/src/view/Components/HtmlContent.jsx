export default function HtmlContent({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
