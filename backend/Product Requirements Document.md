1. generate a web based interface to do and record a psychological experiment
2. 일종의 trust game으로서, 이를 수행하는 python code는 attach 된 file과 같다.
3. user는 gmail, 혹은 email, password도 register하게 된다.
4. 이미 등록된 user는 gmail, 혹은 email, password로 login할 수 있다.
5. login을 하면 일단 실험에 대한 설명을 하는 page로 넘어간다.
6. 설명에 대해 다 읽고 ready button을 누르면 실험이 시작된다.
7. 실험은 두 개의 section으로 구성되며, 먼저 player B로서 그 다음에 player A 역할을 맡아 수행한다.
8. player B로서 하게 되는 첫번째 section에는 화면에 다음과 같은 interface가 보여진다.
    1. player A가 보내준 원금과 player B가 실제로 받은 currency unit (sent unit * PROLIFERATION_FACTOR로 곱한 값)
    2. 실제로 받은 currency unit 중에 얼마를 player A에게 돌려줄 지를 선택하는 input box
    3. 돌려주지 않은 돈은 player B의 수익이 된다.
    4. 화면에는 player B가 게임을 통해 번 총액이 player A의 자산 총액과 함께 표시된다.
    5. 총 round 수 중 현재 몇번째 round를 하고 있는지 표시한다.
    6. 모든 round가 끝나면 수고했다는 message와 함께, 게임을 통해 벌어들인 총 수익이 표시된다.
    7. 또한 다음 section으로 넘어가도 되겠냐는 확인 button이 보여진다.
9. player A로서 하게 되는 두번째 section에는 다음과 같은 interface가 나타난다.
    1. 현재의 자산 총액 중 50%의 한도를 투자 가능 총액으로 보여주고, 이중 얼마를 player B에게 보낼 지 묻는 input box
    2. 보낸 currency unit 중 player B가 얼마를 돌여주었는지를 표시하고, 수익율((돌려받는 액수 - 애초에 보낸 액수)/보낸 액수 - 1로 계산)을 보여준다.
    3. 돌려받는 액수 - 보낸 액수가 수익이 되며, 이는 누적되어 자산이 된다.
    4. 화면에는 player B가 게임을 통해 번 총액이 player A의 자산 총액과 함께 표시된다.
    5. 총 round 수 중 현재 몇번째 round를 하고 있는지 표시한다.
    6. 모든 round가 끝나면 수고했다는 message와 함께, 게임을 통해 벌어들인 총 수익이 표시된다.
    7. 모든 실험이 끝났다는 감사 message를 보여준다.
