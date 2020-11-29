import gql from 'graphql-tag';

export const previewData = gql` query ($teamName: String!) {
    preview(query: { teamName: $teamName }){
      _id
      teamName
      totalL
      totalQ
      questions {
        name
        links
      }
  }
    }`;
export const previewsData = gql` query {
    previews {
        _id
        teamName
        totalL
        totalQ
        questions {
            name
            links
        }
      }
    }`;
export const addQuestion = gql`mutation ($team: [AllTeamTeamUpdateInput], $Top10: [AllTeamTop10UpdateInput], $Top20: [AllTeamTop20UpdateInput], $Top30: [AllTeamTop30UpdateInput], $Top40: [AllTeamTop40UpdateInput], $Top50: [AllTeamTop50UpdateInput], $Top60: [AllTeamTop60UpdateInput], $Top70: [AllTeamTop70UpdateInput], $Top80: [AllTeamTop80UpdateInput], $Top90: [AllTeamTop90UpdateInput], $Top100: [AllTeamTop100UpdateInput], $LinksTop10: [AllTeamLinksTop10UpdateInput], $LinksTop20: [AllTeamLinksTop20UpdateInput], $LinksTop30: [AllTeamLinksTop30UpdateInput], $LinksTop40: [AllTeamLinksTop40UpdateInput], $LinksTop50: [AllTeamLinksTop50UpdateInput], $LinksTop60: [AllTeamLinksTop60UpdateInput], $LinksTop70: [AllTeamLinksTop70UpdateInput], $LinksTop80: [AllTeamLinksTop80UpdateInput], $LinksTop90: [AllTeamLinksTop90UpdateInput], $LinksTop100: [AllTeamLinksTop100UpdateInput], $questions: [PreviewQuestionUpdateInput], $totalQ: Int!, $teamName: String!) {
    updateOnePreview(query: {teamName: $teamName}, set: {questions: $questions, totalQ: $totalQ}){
      totalL
      totalQ
      questions {
        name
        links
      }
    }
    updateOneAllTeam(set: {team: $team, Top10: $Top10, Top20: $Top20, Top30: $Top30, Top40: $Top40, Top50: $Top50, Top60: $Top60, Top70: $Top70, Top80: $Top80, Top90: $Top90, Top100: $Top100, LinksTop10: $LinksTop10, LinksTop20: $LinksTop20, LinksTop30: $LinksTop30, LinksTop40: $LinksTop40, LinksTop50: $LinksTop50, LinksTop60: $LinksTop60, LinksTop70: $LinksTop70, LinksTop80: $LinksTop80, LinksTop90: $LinksTop90, LinksTop100: $LinksTop100}){
      team { 
        name
        totalQ
      }
      Top10 {
        name
        totalQ
        totalL
      }
      Top20 {
        name
        totalQ
        totalL
      }
      Top30 {
        name
        totalQ
        totalL
      }
      Top40 {
        name
        totalQ
        totalL
      }
      Top50 {
        name
        totalQ
        totalL
      }
      Top60 {
        name
        totalQ
        totalL
      }
      Top70 {
        name
        totalQ
        totalL
      }
      Top80 {
        name
        totalQ
        totalL
      }
      Top90 {
        name
        totalQ
        totalL
      }
      Top100 {
        name
        totalQ
        totalL
      }
      LinksTop10 {
        name
        totalQ
        totalL
      }
      LinksTop20 {
        name
        totalQ
        totalL
      }
      LinksTop30 {
        name
        totalQ
        totalL
      }
      LinksTop40 {
        name
        totalQ
        totalL
      }
      LinksTop50 {
        name
        totalQ
        totalL
      }
      LinksTop60 {
        name
        totalQ
        totalL
      }
      LinksTop70 {
        name
        totalQ
        totalL
      }
      LinksTop80 {
        name
        totalQ
        totalL
      }
      LinksTop90 {
        name
        totalQ
        totalL
      }
      LinksTop100 {
        name
        totalQ
        totalL
      }
    }
  }`;
export const deleteQuestion = gql`mutation ($team: [AllTeamTeamUpdateInput], $Top10: [AllTeamTop10UpdateInput], $Top20: [AllTeamTop20UpdateInput], $Top30: [AllTeamTop30UpdateInput], $Top40: [AllTeamTop40UpdateInput], $Top50: [AllTeamTop50UpdateInput], $Top60: [AllTeamTop60UpdateInput], $Top70: [AllTeamTop70UpdateInput], $Top80: [AllTeamTop80UpdateInput], $Top90: [AllTeamTop90UpdateInput], $Top100: [AllTeamTop100UpdateInput], $LinksTop10: [AllTeamLinksTop10UpdateInput], $LinksTop20: [AllTeamLinksTop20UpdateInput], $LinksTop30: [AllTeamLinksTop30UpdateInput], $LinksTop40: [AllTeamLinksTop40UpdateInput], $LinksTop50: [AllTeamLinksTop50UpdateInput], $LinksTop60: [AllTeamLinksTop60UpdateInput], $LinksTop70: [AllTeamLinksTop70UpdateInput], $LinksTop80: [AllTeamLinksTop80UpdateInput], $LinksTop90: [AllTeamLinksTop90UpdateInput], $LinksTop100: [AllTeamLinksTop100UpdateInput], $questions: [PreviewQuestionUpdateInput], $totalL: Int!, $totalQ: Int!, $teamName: String!) {
    updateOnePreview(query: {teamName: $teamName}, set: {questions: $questions, totalL: $totalL, totalQ: $totalQ}){
      totalL
      totalQ
      questions {
        name
        links
      }
    }
    updateOneAllTeam(set: {team: $team, Top10: $Top10, Top20: $Top20, Top30: $Top30, Top40: $Top40, Top50: $Top50, Top60: $Top60, Top70: $Top70, Top80: $Top80, Top90: $Top90, Top100: $Top100, LinksTop10: $LinksTop10, LinksTop20: $LinksTop20, LinksTop30: $LinksTop30, LinksTop40: $LinksTop40, LinksTop50: $LinksTop50, LinksTop60: $LinksTop60, LinksTop70: $LinksTop70, LinksTop80: $LinksTop80, LinksTop90: $LinksTop90, LinksTop100: $LinksTop100}){
      team { 
        name
        totalQ
      }
      Top10 {
        name
        totalQ
        totalL
      }
      Top20 {
        name
        totalQ
        totalL
      }
      Top30 {
        name
        totalQ
        totalL
      }
      Top40 {
        name
        totalQ
        totalL
      }
      Top50 {
        name
        totalQ
        totalL
      }
      Top60 {
        name
        totalQ
        totalL
      }
      Top70 {
        name
        totalQ
        totalL
      }
      Top80 {
        name
        totalQ
        totalL
      }
      Top90 {
        name
        totalQ
        totalL
      }
      Top100 {
        name
        totalQ
        totalL
      }
      LinksTop10 {
        name
        totalQ
        totalL
      }
      LinksTop20 {
        name
        totalQ
        totalL
      }
      LinksTop30 {
        name
        totalQ
        totalL
      }
      LinksTop40 {
        name
        totalQ
        totalL
      }
      LinksTop50 {
        name
        totalQ
        totalL
      }
      LinksTop60 {
        name
        totalQ
        totalL
      }
      LinksTop70 {
        name
        totalQ
        totalL
      }
      LinksTop80 {
        name
        totalQ
        totalL
      }
      LinksTop90 {
        name
        totalQ
        totalL
      }
      LinksTop100 {
        name
        totalQ
        totalL
      }
    }
  }`;
export const addLink = gql`mutation ($team: [AllTeamTeamUpdateInput], $questions: [PreviewQuestionUpdateInput], $LinksTop10: [AllTeamLinksTop10UpdateInput], $LinksTop20: [AllTeamLinksTop20UpdateInput], $LinksTop30: [AllTeamLinksTop30UpdateInput], $LinksTop40: [AllTeamLinksTop40UpdateInput], $LinksTop50: [AllTeamLinksTop50UpdateInput], $LinksTop60: [AllTeamLinksTop60UpdateInput], $LinksTop70: [AllTeamLinksTop70UpdateInput], $LinksTop80: [AllTeamLinksTop80UpdateInput], $LinksTop90: [AllTeamLinksTop90UpdateInput], $LinksTop100: [AllTeamLinksTop100UpdateInput], $Top10: [AllTeamTop10UpdateInput], $Top20: [AllTeamTop20UpdateInput], $Top30: [AllTeamTop30UpdateInput], $Top40: [AllTeamTop40UpdateInput], $Top50: [AllTeamTop50UpdateInput], $Top60: [AllTeamTop60UpdateInput], $Top70: [AllTeamTop70UpdateInput], $Top80: [AllTeamTop80UpdateInput], $Top90: [AllTeamTop90UpdateInput], $Top100: [AllTeamTop100UpdateInput], $totalL: Int!, $teamName: String!) {
    updateOnePreview(query: {teamName: $teamName}, set: {questions: $questions, totalL: $totalL}){
      _id
      totalL
      questions {
        name
        links
      }
    }
     updateOneAllTeam(set: {team: $team, LinksTop10: $LinksTop10, LinksTop20: $LinksTop20, LinksTop30: $LinksTop30, LinksTop40: $LinksTop40, LinksTop50: $LinksTop50, LinksTop60: $LinksTop60, LinksTop70: $LinksTop70, LinksTop80: $LinksTop80, LinksTop90: $LinksTop90, LinksTop100: $LinksTop100, Top10: $Top10, Top20: $Top20, Top30: $Top30, Top40: $Top40, Top50: $Top50, Top60: $Top60, Top70: $Top70, Top80: $Top80, Top90: $Top90, Top100: $Top100}){
      team { 
        name
        totalQ
      }
      LinksTop10 {
        name
        totalQ
        totalL
      }
      LinksTop20 {
        name
        totalQ
        totalL
      }
      LinksTop30 {
        name
        totalQ
        totalL
      }
      LinksTop40 {
        name
        totalQ
        totalL
      }
      LinksTop50 {
        name
        totalQ
        totalL
      }
      LinksTop60 {
        name
        totalQ
        totalL
      }
      LinksTop70 {
        name
        totalQ
        totalL
      }
      LinksTop80 {
        name
        totalQ
        totalL
      }
      LinksTop90 {
        name
        totalQ
        totalL
      }
      LinksTop100 {
        name
        totalQ
        totalL
      }
      Top10 {
        name
        totalQ
        totalL
      }
      Top20 {
        name
        totalQ
        totalL
      }
      Top30 {
        name
        totalQ
        totalL
      }
      Top40 {
        name
        totalQ
        totalL
      }
      Top50 {
        name
        totalQ
        totalL
      }
      Top60 {
        name
        totalQ
        totalL
      }
      Top70 {
        name
        totalQ
        totalL
      }
      Top80 {
        name
        totalQ
        totalL
      }
      Top90 {
        name
        totalQ
        totalL
      }
      Top100 {
        name
        totalQ
        totalL
      }
    }
  }`;
export const linkQuery = gql`
    query {
      link {
        _id
        numLinks
        numQuestions
        currentQ
        currentL
      }
    }`;
export const queryAllTeam = gql`
    query {
      allTeam {
        _id
        team {
          name
          totalL
          totalQ
        }
        Top10 {
          name
          totalQ
          totalL
        }
        Top20 {
          name
          totalQ
          totalL
        }
        Top30 {
          name
          totalQ
          totalL
        }
        Top40 {
          name
          totalQ
          totalL
        }
        Top50 {
          name
          totalQ
          totalL
        }
        Top60 {
          name
          totalQ
          totalL
        }
        Top70 {
          name
          totalQ
          totalL
        }
        Top80 {
          name
          totalQ
          totalL
        }
        Top90 {
          name
          totalQ
          totalL
        }
        Top100 {
          name
          totalQ
          totalL
        }
      }
    }`;
export const ModuleData = gql`
    query {
      mainModule {
        _id
        image
        name
      }
    }`;
export const ImageMutation = gql`mutation ($image: String!) {
    updateOneMainModule(set: {image: $image}){
      image
    }
  }`;
export const ModuleNameMutation = gql`mutation ($name: String!) {
    updateOneMainModule(set: {name: $name}){
      name
    }
  }`;
export const instructQuery = gql`
    query {
      instruct {
        instruction
        number
        steps {
          name
          rank
        },
      },
    }`;
export const instructMutation = gql`mutation ($instruction: String!, $number: Int!, $steps: [InstructStepUpdateInput]) {
  updateOneInstruct(set: { instruction: $instruction, number: $number, steps: $steps }) {
    instruction
    steps {
      rank, 
      name
    }
    number
  }
}`;
export const outComeMutation = gql`mutation ($numQuestions: Int!, $numLinks: Int!) {
  updateOneLink(set: { numQuestions: $numQuestions, numLinks: $numLinks, currentQ: $numQuestions, currentL: $numLinks, }) {
    _id
    numQuestions
    numLinks
    currentL
    currentQ
  }
}`;
